import { Routes } from '@angular/router';
import { PatientInsurance } from './patientinsurance/patientinsurance';
import { PatientInsuranceAdd } from './patientinsuranceadd/patientinsuranceadd';
import { PatientInsuranceEdit } from './patientinsuranceedit/patientinsuranceedit';

export const PATIENT_ROUTES: Routes = [
  {
    path: 'patient/patientinsurancelist',
    component: PatientInsurance,
    data: { title: 'Patient Insurance' }
  },
  {
    path: 'patient/patientinsuranceadd',
    component: PatientInsuranceAdd,
    data: { title: 'Add Patient Insurance' }
  },
  {
    path: 'patient/patientinsuranceedit/:id',
    component: PatientInsuranceEdit,
    data: { title: 'Edit Patient Insurance' }
  }
];
