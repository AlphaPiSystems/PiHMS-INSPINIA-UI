export type HousekeepingTaskType = {
    id: number;
    TaskName: string;
    Descriptions: string;
    Duration: string;
    Category: string;
    Notes: string;
    BranchID: number | null;
    DepartmentID: number | null;
    CreatedStaffID: number | null;
    CreatedDateTime: string | null;
    UpdatedStaffID: number | null;
    UpdatedDateTime: string | null;
    IsRowDeleted: string;
}
