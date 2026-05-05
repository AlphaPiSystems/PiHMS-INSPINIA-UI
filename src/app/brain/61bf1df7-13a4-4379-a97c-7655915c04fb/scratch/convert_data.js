const raw = `
'1', 'General', 'General department.', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', '4'
'2', 'Andrology', 'Andrology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'3', 'Bio Chemistry', 'Bio Chemistry', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', '2'
'4', 'Cardiology', 'Cardiology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'5', 'Clinical Pathology', 'Clinical Pathology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', '3'
'6', 'Cyto-Pathology', 'Cyto-Pathology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'7', 'Gastroenterology ', 'Gastroenterology ', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'8', 'Haematology', 'Haematology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', '1'
'9', 'Histo-Pathology', 'Histo-Pathology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'10', 'Microbiology', 'Microbiology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'11', 'Radiology', 'Radiology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'12', 'Serology', 'Serology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'59', 'Anaesthetics', 'Anaesthetics', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'60', 'Diagnostic imaging (X-Ray)', 'Diagnostic imaging (X-Ray)', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'61', 'Ear nose and throat (ENT)', 'Ear nose and throat (ENT)', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'62', 'General surgery', 'General surgery', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'63', 'Gynaecology', 'Gynaecology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'64', 'Histo-Pathology', 'Histo-Pathology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'65', 'Nephrology', 'Nephrology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'66', 'Neurology', 'Neurology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'67', 'Nutrition and dietetics', 'Nutrition and dietetics', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'68', 'Obstetrics and gynaecology', 'Obstetrics and gynaecology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'69', 'Oncology', 'Oncology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'70', 'Ophthalmology', 'Ophthalmology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'71', 'Orthopaedics ', 'Orthopaedics ', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'72', 'Physiotherapy', 'Physiotherapy', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'73', 'Radiotherapy', 'Radiotherapy', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'74', 'Rheumatology', 'Rheumatology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'75', 'Urology', 'Urology', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'76', 'Pediatricians', 'Pediatricians', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'77', 'Physician', 'Physician', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'78', 'General Physician(Lady)', 'General Physician(Lady)', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'79', 'Phychaiatrist', 'Phychaiatrist', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'80', 'Dermatologist', 'Dermatologist', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'81', 'Plastic Surgeon', 'Plastic Surgeon', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'82', 'Homeopathy', 'Homeopathy', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
'83', 'ENDOCRINOLOGY', 'ENDOCRINOLOGY', '1', '1', '1', '2013-06-19 12:54:00', '1', '2013-06-19 12:54:00', 'N', NULL
`;

const lines = raw.trim().split('\n');
const keys = ['id', 'Name', 'Description', 'BranchID', 'DepartmentID', 'CreatedStaffID', 'CreatedDateTime', 'UpdatedStaffID', 'UpdatedDateTime', 'IsRowDeleted', 'ReportPriority'];

const json = lines.map(line => {
  const values = line.split(',').map(v => {
    v = v.trim();
    if (v === 'NULL') return null;
    return v.replace(/^'|'$/g, '');
  });
  const obj = {};
  keys.forEach((key, i) => {
    obj[key] = values[i];
  });
  return obj;
});

console.log(JSON.stringify(json, null, 2));
