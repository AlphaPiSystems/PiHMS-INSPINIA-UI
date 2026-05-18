export interface Department {
  id: number;
  Name: string;
  Description: string;
  BranchID: number;
  DepartmentID: number;
  CreatedStaffID: string;
  CreatedDateTime: string;
  UpdatedStaffID: string;
  UpdatedDateTime: string;
  IsRowDeleted: string;
  ReportPriority: number | null;
}
