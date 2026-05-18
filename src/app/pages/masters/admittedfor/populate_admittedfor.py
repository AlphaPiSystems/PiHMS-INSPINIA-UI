import json
import re

db_path = r'c:\Insperion\Seed5\src\assets\data\db.json'

raw_data = """
'1', 'Normal Delivery', 'Delivery', '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'N'
'2', 'Bipass Surgery', 'Bipass Surgery', '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'Y'
'3', 'LSCS', NULL, '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'N'
'4', 'Medical Cases', NULL, '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'N'
'5', 'Circumcision', NULL, '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'N'
'41', 'LipoSucktion', NULL, '1', '1', '1', '2013-11-12 00:00:00', '1', '2013-11-12 00:00:00', 'N'
'43', 'Assisted Delivery', 'Delivery', '1', '1', '1', '2013-11-27 00:00:00', '1', '2013-11-27 00:00:00', 'N'
'45', 'Viral Fever', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'48', 'Dengue Fever', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'49', 'Malaria', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'50', 'Entric Fever', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'51', 'ARTI', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'52', 'LRTI', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'53', 'Pneumonitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'54', 'Bronchitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'55', 'Abscess', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'56', 'Ureteric Calculi', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'57', 'Acute GE', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'58', 'Pneumonia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'59', 'Tonsilliitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'60', 'Phimosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'61', 'Accelerated Hypertension', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'62', 'Hypoglycemia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'63', 'Diabetic Ketoacidosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'64', 'Acute Appendicits', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'65', 'Fibroadenoma Breast', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'66', 'Umbilical Hernia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'67', 'Inguinal Hernia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'68', 'Hydrocele', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'69', 'Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'70', 'IVDP', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'71', 'Fracture Upper Limb', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'72', 'Fracture Lower Limb', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'73', 'Missed Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'74', 'Spontaneous Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'75', 'Threatened Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'76', 'Fibroid Uterus', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'77', 'Ovarian Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'78', 'Ectopic Pregnancy', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'79', 'Lipoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'80', 'Sebaceous Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'81', 'Breast Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'82', 'Pilonidal Sinus', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'83', 'Haemmorrhoid', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'84', 'Carcinoma Colon', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'85', 'Cellulitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'86', 'Diabetic Foot', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'87', 'Gangrene', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'88', 'Vulval Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'89', 'Cervical Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'90', 'Thyroid Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'91', 'Ovarian Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'92', 'Thyroid Swelling', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'93', 'Nasal Polyp', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'94', 'DNS', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'95', 'Dengue Fever', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'96', 'Malaria', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'97', 'Entric Fever', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'98', 'ARTI', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'99', 'LRTI', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'100', 'Pneumonitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'101', 'Bronchitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'102', 'Abscess', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'103', 'Ureteric Calculi', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'104', 'Acute GE', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'105', 'Pneumonia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'106', 'Tonsilliitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'107', 'Phimosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'108', 'Accelerated Hypertension', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'109', 'Hypoglycemia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'110', 'Diabetic Ketoacidosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'111', 'Acute Appendicits', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'112', 'Fibroadenoma Breast', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'113', 'Umbilical Hernia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'114', 'Inguinal Hernia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'115', 'Hydrocele', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'116', 'Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'117', 'IVDP', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'118', 'Fracture Upper Limb', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'119', 'Fracture Lower Limb', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'120', 'Missed Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'121', 'Spontaneous Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'122', 'Threatened Abortion', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'123', 'Fibroid Uterus', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'124', 'Ovarian Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'125', 'Ectopic Pregnancy', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'126', 'Lipoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'127', 'Sebaceous Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'128', 'Breast Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'129', 'Pilonidal Sinus', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'130', 'Haemmorrhoid', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'131', 'Carcinoma Colon', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'132', 'Cellulitis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'133', 'Diabetic Foot', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'134', 'Gangrene', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'135', 'Vulval Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'136', 'Cervical Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'137', 'Thyroid Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'138', 'Ovarian Carcinoma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'139', 'Thyroid Swelling', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'140', 'Nasal Polyp', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'141', 'DNS', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'142', 'BPH', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'143', 'Stricture Urethra', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'144', 'Anal Fissure', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'145', 'Fistula', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'146', 'Renal Calculi', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'147', 'Bartholin Cyst', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'148', 'UTI', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'149', 'Pyelonephritis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'150', 'Intestinal Tuberculosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'151', 'Pulmonary Tuberculosis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'152', 'Bronchial Asthma', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'153', 'Hemeparesis', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'154', 'Hemiplegia', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'155', 'Seizure Disorder', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'156', 'COPD', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
'157', 'Febrile Seizures', ' ', '1', '1', '1', NULL, '1', NULL, 'N'
"""

def clean_val(val):
    val = val.strip()
    if val.upper() == 'NULL':
        return None
    if val.startswith("'") and val.endswith("'"):
        return val[1:-1]
    return val

admittedfor_list = []
for line in raw_data.strip().split('\n'):
    parts = line.split(',')
    if len(parts) < 10:
        continue
    
    entry = {
        "id": int(clean_val(parts[0])),
        "Type": clean_val(parts[1]),
        "Description": clean_val(parts[2]),
        "BranchID": clean_val(parts[3]),
        "DepartmentID": clean_val(parts[4]),
        "CreatedStaffID": clean_val(parts[5]),
        "CreatedDateTime": clean_val(parts[6]),
        "UpdatedStaffID": clean_val(parts[7]),
        "UpdatedDateTime": clean_val(parts[8]),
        "IsRowDeleted": clean_val(parts[9])
    }
    admittedfor_list.append(entry)

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

db['admittedfor'] = admittedfor_list

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2)

print(f"Populated {len(admittedfor_list)} entries into admittedfor collection.")
