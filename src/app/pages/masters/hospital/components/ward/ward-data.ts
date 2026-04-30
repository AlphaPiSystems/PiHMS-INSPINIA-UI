export const WARD_LIST = [
  {
    id: 'WRD001',
    WardNumber: 'W-101',
    Name: 'General Ward - Male',
    Description: 'Male General Ward',
    FloorID: 'FLR001',
    FloorName: 'First Floor',
    WardTypeID: 'General',
    PhoneNumber: '080-1234567',
    ExtensionNumber: '101',
    BranchID: 1,
    BranchName: 'Main Branch',
    DepartmentID: 1,
    Department: 'General Medicine',
    Status: 'Active'
  },
  {
    id: 'WRD002',
    WardNumber: 'W-201',
    Name: 'ICU - A',
    Description: 'Intensive Care Unit',
    FloorID: 'FLR002',
    FloorName: 'Second Floor',
    WardTypeID: 'ICU',
    PhoneNumber: '080-2345678',
    ExtensionNumber: '201',
    BranchID: 1,
    BranchName: 'Main Branch',
    DepartmentID: 2,
    Department: 'Critical Care',
    Status: 'Active'
  },
  {
    id: 'WRD003',
    WardNumber: 'W-301',
    Name: 'Pediatric Ward',
    Description: 'Pediatric Care Unit',
    FloorID: 'FLR003',
    FloorName: 'Third Floor',
    WardTypeID: 'Pediatric',
    PhoneNumber: '080-3456789',
    ExtensionNumber: '301',
    BranchID: 1,
    BranchName: 'Main Branch',
    DepartmentID: 3,
    Department: 'Pediatrics',
    Status: 'Inactive'
  }
];

export const WARD_TYPES = ['General', 'ICU', 'Semi-Private', 'Private', 'Pediatric', 'Maternity'];
export const STATUS_LIST = ['Active', 'Inactive'];
