export type ScanType = {
    id: number;
    Name: string;
    Description: string;
    IsRowDeleted: string;
    CreatedBy: string;
    CreatedDateTime: string | null;
    UpdatedBy: string | null;
    UpdatedDateTime: string | null;
    Status: string;
}

export type ScanningItemType = {
    id: number;
    ScanName: string;
    ScanID: string;
    Title: string;
    Description: string;
    IsRowDeleted: string;
    CreatedBy: string;
    CreatedDateTime: string | null;
    UpdatedBy: string | null;
    UpdatedDateTime: string | null;
    Priority: number;
    Alignment: string;
    ValueType: string;
    Status: string; // Including Status for consistency
}

export type ScanningTemplateType = {
    id: number;
    Name: string;
    Description: string;
    IsRowDeleted: string;
    CreatedBy: string;
    CreatedDateTime: string | null;
    UpdatedBy: string | null;
    UpdatedDateTime: string | null;
    Status: string;
    ScanTemplateData: any;
}
