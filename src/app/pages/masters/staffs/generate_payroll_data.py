import json
import os
import random

db_path = r'c:\Insperion\Seed5\src\assets\data\db.json'

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

staff_list = db.get('staff', [])
existing_payroll = {str(p['StaffID']): p for p in db.get('staff_payroll', [])}

def get_default_basic(designation):
    designation = designation.lower()
    if 'surgeon' in designation or 'doctor' in designation or 'physician' in designation:
        return random.randint(45000, 65000)
    elif 'nurse' in designation:
        return random.randint(25000, 35000)
    elif 'manager' in designation or 'head' in designation:
        return random.randint(35000, 50000)
    elif 'operator' in designation or 'technician' in designation:
        return random.randint(18000, 25000)
    else:
        return random.randint(15000, 20000)

new_staff_payroll = []
new_staff_deduction = []
payroll_id = 1
deduction_id = 1

for staff in staff_list:
    staff_id = str(staff['id'])
    designation = staff.get('Designation', 'Staff')
    
    # Base values
    basic = get_default_basic(designation)
    hra = round(basic * 0.40, 2)
    ca = 1600.00
    ma = 1250.00
    va = 1500.00
    pb = round(basic * 0.05, 2)
    
    total_earnings = basic + hra + ca + ma + va + pb
    
    # Calculate Deductions
    pf_amount = 1800.00
    pt_amount = 200.00
    tds_amount = round(total_earnings * 0.10, 2) if total_earnings > 30000 else 0
    esi_amount = round(total_earnings * 0.0075, 2)
    adv_amount = 500.00 if int(staff_id) % 7 == 0 else 0
    
    payroll_entry = {
        "id": payroll_id,
        "StaffID": staff_id,
        "Employer": "City Hospital",
        "WorkingPeriodFrom": "2020-01-01",
        "WorkingPeriodTo": "2024-12-31",
        "PositionHeld": designation,
        "Department": staff.get('Department', 'General'),
        "Speciality": "General",
        "BranchID": 1,
        "DepartmentID": 1,
        "CreatedStaffID": "1",
        "CreatedDateTime": "2024-01-01 10:00:00",
        "UpdatedStaffID": None,
        "UpdatedDateTime": None,
        "IsRowDeleted": "N",
        "BASIC": float(basic),
        "HRA": float(hra),
        "CA": float(ca),
        "MA": float(ma),
        "VA": float(va),
        "PB": float(pb),
        "PF": float(pf_amount),
        "PT": float(pt_amount),
        "TDS": float(tds_amount),
        "ESI": float(esi_amount),
        "ADV": float(adv_amount)
    }
    
    # Preserve some manual edits if they exist (optional, but here we overwrite for 'appropriate values')
    if staff_id in existing_payroll:
        ex = existing_payroll[staff_id]
        # Keep dates and employer if they look custom
        if ex.get('Employer') != "City Hospital":
            payroll_entry['Employer'] = ex['Employer']

    new_staff_payroll.append(payroll_entry)
    
    # Sync staff_deduction table
    for name, amount in [("PF", pf_amount), ("PT", pt_amount), ("TDS", tds_amount), ("ESI", esi_amount), ("ADV", adv_amount)]:
        if amount > 0:
            new_staff_deduction.append({
                "id": deduction_id,
                "StaffID": staff_id,
                "Name": name,
                "Amount": amount
            })
            deduction_id += 1
            
    payroll_id += 1

db['staff_payroll'] = new_staff_payroll
db['staff_deduction'] = new_staff_deduction

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2)

print(f"Repopulated {len(new_staff_payroll)} payroll records with appropriate earnings and deductions.")
