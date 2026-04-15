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
  DiagDepartmentID: number;
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
  DepartmentID: number;
  CreatedStaffID: number;
  CreatedDateTime: string;
  UpdatedStaffID: number;
  UpdatedDateTime: string;
  IsRowDeleted: string;
  InstrumentID: number;
  selected?: boolean,
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