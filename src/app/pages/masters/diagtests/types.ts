export type TestType = {
  id: number;
  Code: string;
  Name: string;
  ShortName: string;
  ReportName: string;
  Type: string;
  SampleID: number | null;
  InstrumentName: string | null;
  TestNameInInstrument: string;
  ReportingPriority: number;
  IsOutsourced: string;
  IsNABLApproved: string;
  Notes: string;
  Comments: string;
  Methodology: string;
  Units: number;
  UnitID: number | null;
  UnitName: string | null;
  HasNormalRange: string;
  InvestigationType: string;
  ReportType: string;
  DefaultReportData: string;
  ReportAlign: string;
  PageBreakNeeded: string;
  BranchID: number;
  DepartmentID: string;
  CreatedStaffID: number;
  CreatedDateTime: string;
  UpdatedStaffID: number;
  UpdatedDateTime: string;
  IsRowDeleted: string;
  InstrumentID: number;
  selected?: boolean;
}

export type InstrumentType = {
  id: string;
  InstrumentationName: string;
  BranchName: string;
  DepartmentName: string;
  CreatedStaffID: string;
  CreatedDateTime: string | null;
  UpdatedStaffID: string | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string;
  selected?: boolean;
}

// export type TestType = {
//     id: number,
//     name: string,
//     code: string,
//     category: string,
//     price: number,
//     status: "active" | "inactive",
//     date: string,
//     time: string;
// }   

export type PatientType = {
  id: number;
  uhid: string;
  name: string;
  age: number;
  gender: string;
  registereddate:string
  phone: string;
  lastVisit: string;
  status: 'OP' | 'IP';
}

export interface TestTemplateType {
  id: number;
  DiagTestID: number | null;
  DiagTestCode: string;
  DiagTestName: string;
  DoctorStaffID: number | null;
  DoctorStaffName: string;
  TemplateName: string;
  TemplateData: string;
  TemplateDataStr: string;
  BranchID: number | null;
  DepartmentID: number | null;
  CreatedStaffID: number | null;
  CreatedDateTime: string | null;
  UpdatedStaffID: number | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string;
  selected?: boolean;
}