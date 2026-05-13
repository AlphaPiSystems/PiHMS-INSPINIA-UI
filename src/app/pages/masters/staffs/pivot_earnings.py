import json

def pivot_staff_earnings():
    db_path = 'src/assets/data/db.json'
    with open(db_path, 'r') as f:
        db = json.load(f)

    earnings = db.get('staff_earnings', [])
    if not earnings:
        print("No earnings found.")
        return

    # Pivot data by StaffID
    pivoted = {}
    for e in earnings:
        sid = e['StaffID']
        name = e['Name']
        amount = e['Amount']
        
        if sid not in pivoted:
            pivoted[sid] = {
                "id": sid, # Using sid as id for the pivoted record
                "StaffID": sid,
                "BASIC": 0.0,
                "HRA": 0.0,
                "CA": 0.0,
                "MA": 0.0,
                "VA": 0.0,
                "PB": 0.0,
                "CreatedStaffID": e.get('CreatedStaffID'),
                "CreatedDateTime": e.get('CreatedDateTime'),
                "UpdatedStaffID": e.get('UpdatedStaffID'),
                "UpdatedDateTime": e.get('UpdatedDateTime'),
                "IsRowDeleted": "N"
            }
        
        # Map the value to the column name
        pivoted[sid][name] = amount

    # Convert back to list, sorted by StaffID
    new_earnings_list = sorted(list(pivoted.values()), key=lambda x: x['StaffID'])

    db['staff_earnings'] = new_earnings_list

    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)
    
    print(f"Pivoted earnings into {len(new_earnings_list)} rows.")

if __name__ == "__main__":
    pivot_staff_earnings()
