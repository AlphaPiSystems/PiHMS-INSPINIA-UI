import json
import os

def update_inventory_departments():
    data_str = """'1', 'LABORATORY', NULL, NULL, NULL, '1983', '2020-09-23 15:04:33', '1983', '2020-09-23 15:04:33', NULL
'2', 'PHARMARCY', NULL, NULL, NULL, '1983', '2020-09-23 15:05:17', '1983', '2020-09-23 15:05:17', NULL
'3', 'SECOND FLOOR', NULL, NULL, NULL, '1983', '2020-09-23 15:05:46', '1983', '2020-09-23 15:05:46', NULL
'4', 'THIRD FLOOR', NULL, NULL, NULL, '1983', '2020-09-23 15:06:02', '1983', '2020-09-23 15:06:02', NULL
'5', 'ACCOUNTS', NULL, NULL, NULL, '1983', '2020-09-23 15:06:23', '1983', '2020-09-23 15:06:23', NULL
'6', 'BILLING\\INSURANCE', NULL, NULL, NULL, '1983', '2020-09-23 15:06:50', '1983', '2020-09-23 15:06:50', NULL
'7', 'SCANNING', NULL, NULL, NULL, '1983', '2020-09-23 15:07:27', '1983', '2020-09-23 15:07:27', NULL
'8', 'DIALYSIS', NULL, NULL, NULL, '1983', '2020-09-23 15:08:32', '1983', '2020-09-23 15:08:32', NULL
'9', 'ICU', NULL, NULL, NULL, '1983', '2020-09-23 15:08:49', '1983', '2020-09-23 15:08:49', NULL
'10', 'OT', NULL, NULL, NULL, '1983', '2020-09-23 15:08:58', '1983', '2020-09-23 15:08:58', NULL
'11', 'LABOUR', NULL, NULL, NULL, '1983', '2020-09-23 15:09:20', '1983', '2020-09-23 15:09:20', NULL
'12', 'HOUSE KEEPING', NULL, NULL, NULL, '1983', '2020-09-23 15:10:23', '1983', '2020-09-23 15:10:23', NULL
'13', 'ELE - MAINTAINCE', NULL, NULL, NULL, '1983', '2020-09-23 15:10:38', '1983', '2020-09-23 15:10:38', NULL
'14', 'X- RAY', NULL, NULL, NULL, '1983', '2020-09-23 15:10:58', '1983', '2020-09-23 15:10:58', NULL
'18', 'MRD', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', NULL
'19', 'CASUALITY', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', 'N'
'20', 'ULTRASOUND', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', 'N'
'21', 'RADIOLOGY', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', 'N'
'22', 'CSSD', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', 'N'
'23', 'OTHERS', NULL, NULL, NULL, '1983', '2020-09-23 15:13:46', '1983', '2020-09-23 15:13:46', 'N'
'24', 'RECEPTION', NULL, NULL, NULL, '1983', '2021-08-12 15:24:39', '1983', '2021-08-12 15:24:39', NULL
'25', 'YMRC', NULL, NULL, NULL, '2423', '2021-08-19 10:13:42', '2423', '2021-08-19 10:13:42', NULL
'26', 'SWAB TUBE STERILE', NULL, NULL, NULL, '2423', '2021-09-08 16:27:55', '2423', '2021-09-08 16:27:55', NULL"""

    departments = []
    for line in data_str.strip().split('\n'):
        parts = [p.strip().strip("'") for p in line.split(',')]
        dept = {
            "id": int(parts[0]),
            "Name": parts[1],
            "Description": None if parts[2] == 'NULL' else parts[2],
            "BranchID": None if parts[3] == 'NULL' else parts[3],
            "DepartmentID": None if parts[4] == 'NULL' else parts[4],
            "CreatedStaffID": parts[5],
            "CreatedDateTime": parts[6],
            "UpdatedStaffID": parts[7],
            "UpdatedDateTime": parts[8],
            "IsRowDeleted": "N" if parts[9] == 'NULL' else parts[9]
        }
        departments.append(dept)

    db_path = 'src/assets/data/db.json'
    with open(db_path, 'r') as f:
        db = json.load(f)

    db['inventory_departments'] = departments

    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)
    
    print(f"Successfully updated {len(departments)} inventory departments.")

if __name__ == "__main__":
    update_inventory_departments()
