export type PharmacyType = {
    id: number;
    ItemName: string;
    ItemCode: string;
    BatchNum: string;
    ExpiryDate: string | null;
    DosageForm: string;
    ConstituentsPerUnit: string;
    Manufacturer: string;
    Distributor: string;
    BranchID: number | null;
    DepartmentID: number | null;
    CreatedStaffID: number | null;
    CreatedDateTime: string | null;
    UpdatedStaffID: number | null;
    UpdatedDateTime: string | null;
    IsRowDeleted: string;
}
