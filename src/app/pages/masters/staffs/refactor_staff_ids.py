import json

def refactor_staff_ids():
    db_path = 'src/assets/data/db.json'
    with open(db_path, 'r') as f:
        db = json.load(f)

    staff_list = db.get('staff', [])
    if not staff_list:
        print("No staff found in db.json")
        return

    # Create mapping: old_id -> new_id
    id_map = {}
    new_staff_list = []
    
    for i, staff in enumerate(staff_list):
        old_id = str(staff['id'])
        new_id = i + 1
        id_map[old_id] = new_id
        
        # Update staff record
        new_staff = staff.copy()
        new_staff['id'] = new_id
        new_staff_list.append(new_staff)

    db['staff'] = new_staff_list

    # Update staff_earnings
    earnings = db.get('staff_earnings', [])
    for e in earnings:
        old_staff_id = str(e.get('StaffID'))
        if old_staff_id in id_map:
            e['StaffID'] = str(id_map[old_staff_id])
        
        # Also update audit fields if they match
        old_created_staff = str(e.get('CreatedStaffID'))
        if old_created_staff in id_map:
            e['CreatedStaffID'] = str(id_map[old_created_staff])
            
        old_updated_staff = str(e.get('UpdatedStaffID'))
        if old_updated_staff in id_map:
            e['UpdatedStaffID'] = str(id_map[old_updated_staff])

    # Update audit fields in other modules
    keys_to_update = [
        'patient', 'departments', 'floors', 'hospitalbuilding', 'wardtype', 'ward', 
        'wardbed', 'diagtest', 'sample', 'unit', 'diaggroup', 'instrument', 
        'city', 'district', 'state', 'country', 'postalcode', 'bank', 
        'insuranceprovider', 'scan', 'scanningitem', 'surgery', 
        'housekeeping_tasks', 'insurance', 'patient_insurance', 'bill_domain', 
        'bill_item', 'inventory_items', 'vendors', 'inventory_departments'
    ]

    for key in keys_to_update:
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
    
    print(f"Successfully re-indexed {len(new_staff_list)} staff members and updated staff_earnings.")

if __name__ == "__main__":
    refactor_staff_ids()
