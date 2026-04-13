export interface PatientType {
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