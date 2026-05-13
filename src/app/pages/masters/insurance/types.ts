export type InsuranceType = {
    id: number;
    Name: string;
    Description: string;
    BranchID: number | null;
    DepartmentID: number | null;
    CreatedStaffID: number | null;
    CreatedDateTime: string | null;
    UpdatedStaffID: number | null;
    UpdatedDateTime: string | null;
    IsRowDeleted: string;
}
