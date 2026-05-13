import json
import re

raw_data = """
'1', 'STORE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1983', '2020-09-23 15:11:58', '1983', '2020-09-23 15:11:58', NULL
'2', 'MITRA DISTRIBUTOR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1983', '2020-09-23 15:12:44', '1983', '2020-09-23 15:12:44', NULL
'3', 'SANDOOR MEDICAIDS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1983', '2020-09-23 15:13:00', '1983', '2020-09-23 15:13:00', NULL
'4', 'REVA DISTRIBUTOR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1983', '2020-09-23 15:13:12', '1983', '2020-09-23 15:13:12', NULL
'5', 'SRI VINAYAKA DISTRIBUTOR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1983', '2020-09-23 15:13:33', '1983', '2020-09-23 15:13:33', NULL
'6', 'ABHAY TECHNOLOGIES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2093', '2021-08-12 15:30:10', '2093', '2021-08-12 15:30:10', NULL
'8', 'HYGIENE OFFICE SOLLUTIONS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-08-17 12:41:39', '2423', '2021-08-17 12:41:39', NULL
'9', 'SAPTHAGIRI MEDICAL SYSTEMS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-08-19 11:24:31', '2423', '2021-08-19 11:24:31', NULL
'10', 'S R ENTERPRISES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2178', '2021-08-20 10:44:42', '2178', '2021-08-20 10:44:42', NULL
'11', 'CHITRA GROUP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-08-27 11:36:45', '2423', '2021-08-27 11:36:45', NULL
'12', 'TOTAL CLEANING SYSTEMS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-08-27 11:45:31', '2423', '2021-08-27 11:45:31', NULL
'13', 'SHOBHA STATIONERY & TELECOM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2178', '2021-09-03 09:49:46', '2178', '2021-09-03 09:49:46', NULL
'14', 'OKTO HEALTHCARE & SERVICES LLP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-09-04 14:23:29', '2423', '2021-09-04 14:23:29', NULL
'15', 'NEWGEN SALES CORPORATION', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-09-06 12:30:11', '2423', '2021-09-06 12:30:11', NULL
'16', 'SAMRUDDHI PRINT SOLUTIONS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-09-20 15:14:34', '2423', '2021-09-20 15:14:34', NULL
'17', 'SHOBHA STATIONERY AND TELECOM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-09-29 16:37:23', '2423', '2021-09-29 16:37:23', NULL
'18', 'GIGI\'S WORLD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-10-16 14:49:57', '2423', '2021-10-16 14:49:57', NULL
'19', 'SHREE CHANDRASHEKHAR ENTERPRISES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-11-08 13:22:13', '2423', '2021-11-08 13:22:13', NULL
'20', 'VIJAYALAKSHMI COMPUTERS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2021-12-20 17:21:04', '2423', '2021-12-20 17:21:04', NULL
'21', 'SHREE CHANDRASHEKHAR ENTERPRISES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2022-01-15 15:26:21', '2423', '2022-01-15 15:26:21', NULL
'22', 'RB INFOTECH SOLUTIONS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2022-03-22 12:16:59', '2423', '2022-03-22 12:16:59', NULL
'23', 'MADHURI PRINT MEDIA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2022-03-24 15:35:05', '2423', '2022-03-24 15:35:05', NULL
'24', 'SAVI ENTERPRISES', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2423', '2022-04-14 16:24:54', '2423', '2022-04-14 16:24:54', NULL
"""

lines = raw_data.strip().split('\n')
vendors = []
for line in lines:
    # Use regex to handle potential escaped quotes in names
    matches = re.findall(r"'([^']*(?:''[^']*)*)'|NULL", line)
    # The regex might capture empty groups for NULLs, let's fix it
    parts = []
    # Re-parse manually for better reliability
    # Actually, a simpler way since they are comma separated:
    row_parts = [p.strip() for p in line.split(',')]
    
    def clean(val):
        if val == 'NULL': return None
        if val.startswith("'") and val.endswith("'"):
            return val[1:-1].replace("\\'", "'")
        return val

    p = [clean(part) for part in row_parts]
    
    vendor = {
        "id": int(p[0]) if p[0] else None,
        "Name": p[1],
        "VendorCode": p[2],
        "Address": p[3],
        "City": p[4],
        "State": p[5],
        "Country": p[6],
        "PostalCode": p[7],
        "ContactPersonName": p[8],
        "ContactPersonPhone": p[9],
        "Notes": p[10],
        "BranchID": p[11],
        "DepartmentID": p[12],
        "CreatedStaffID": p[13],
        "CreatedDateTime": p[14],
        "UpdatedStaffID": p[15],
        "UpdatedDateTime": p[16],
        "IsRowDeleted": p[17] if len(p) > 17 else 'N'
    }
    vendors.append(vendor)

with open('src/assets/data/db.json', 'r') as f:
    db = json.load(f)

db['vendors'] = vendors

with open('src/assets/data/db.json', 'w') as f:
    json.dump(db, f, indent=2)

print(f"Successfully updated db.json with {len(vendors)} vendors.")
