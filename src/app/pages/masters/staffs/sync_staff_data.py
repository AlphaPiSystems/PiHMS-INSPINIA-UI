import json

def sync_staff_and_earnings():
    db_path = 'src/assets/data/db.json'
    with open(db_path, 'r') as f:
        db = json.load(f)

    earnings = db.get('staff_earnings', [])
    current_staff = db.get('staff', [])
    
    # 1. Get all unique StaffIDs from earnings
    earning_staff_ids = sorted(list(set([str(e['StaffID']) for e in earnings])))
    
    # 2. Create a base list of staff names/info
    # Map old_id -> Name if possible
    name_map = {str(s['id']): s['Name'] for s in current_staff}
    
    # 3. Create a master list of unique staff IDs involved
    # Include any staff in 'staff' table even if no earnings, and all from earnings
    all_old_ids = sorted(list(set(list(name_map.keys()) + earning_staff_ids)))
    
    # 4. Create new mapping old_id -> new_id (1-based)
    id_map = {old_id: i + 1 for i, old_id in enumerate(all_old_ids)}
    
    # 5. Build new staff table
    new_staff_list = []
    for old_id in all_old_ids:
        new_id = id_map[old_id]
        name = name_map.get(old_id, f"Staff Member {old_id}")
        
        # Try to preserve original staff object if it existed
        orig_staff = next((s for s in current_staff if str(s['id']) == old_id), None)
        if orig_staff:
            new_staff = orig_staff.copy()
            new_staff['id'] = new_id
        else:
            # Create a placeholder record
            new_staff = {
                "id": new_id,
                "Name": name,
                "Role": "Staff",
                "BranchName": "Main Branch",
                "DepartmentName": "General",
                "Status": "Active",
                "IsRowDeleted": "N"
            }
        new_staff_list.append(new_staff)
    
    db['staff'] = new_staff_list
    
    # 6. Update staff_earnings
    for e in earnings:
        old_sid = str(e['StaffID'])
        if old_sid in id_map:
            e['StaffID'] = str(id_map[old_sid])
            
    # 7. Update audit fields globally (important for consistency)
    all_keys = [
        'patient', 'departments', 'floors', 'hospitalbuilding', 'wardtype', 'ward', 
        'wardbed', 'diagtest', 'sample', 'unit', 'diaggroup', 'instrument', 
        'city', 'district', 'state', 'country', 'postalcode', 'bank', 
        'insuranceprovider', 'scan', 'scanningitem', 'surgery', 
        'housekeeping_tasks', 'insurance', 'patient_insurance', 'bill_domain', 
        'bill_item', 'inventory_items', 'vendors', 'inventory_departments'
    ]
    
    for key in all_keys:
        if key in db:
            for item in db[key]:
                if 'CreatedStaffID' in item:
                    old_c = str(item['CreatedStaffID'])
                    if old_c in id_map:
                        item['CreatedStaffID'] = str(id_map[old_c])
                if 'UpdatedStaffID' in item:
                    old_u = str(item['UpdatedStaffID'])
                    if old_u in id_map:
                        item['UpdatedStaffID'] = str(id_map[old_u])

    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)
    
    print(f"Sync complete. Total staff: {len(new_staff_list)}. Earnings updated: {len(earnings)}.")

if __name__ == "__main__":
    sync_staff_and_earnings()
