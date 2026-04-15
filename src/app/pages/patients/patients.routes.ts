import { Routes } from '@angular/router';
import { PatientIndex } from './patient-index/patient-index';
import { PatientDashboard } from './patient-dashboard/patient-dashboard';
import { Details } from './tabs/details/details';
import {Visit}  from './tabs/visit/visit'
import { History } from './tabs/history/history';
import { Billing } from './tabs/billing/billing';
import { VisitNew } from './tabs/visit-new/visit-new';
import { VisitEdit } from './tabs/visit-edit/visit-edit';
import { Lab } from './tabs/lab/lab';
import { Scanning } from './tabs/scanning/scanning'; 
import { Insurance } from './tabs/insurance/insurance';
import { LabView } from './tabs/lab-view/lab-view';
import { PatientNew } from './patient-new/patient-new';
export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientIndex,
    data: { title: "Patients" },
  },
  {
    path: 'dashboard/:id',
    component: PatientDashboard,
    data: { title: "Patient Dashboard" },

  },
  {
    path: 'details/:id',
    component: Details,
    data: { title: "Patient Details" },
    
  },
  {
    path: 'visit/:id',
    component: Visit,
    data: { title: "Visit Details" },
    
  },
  {
    path: 'history/:id',
    component: History,
    data: { title: "History Details" },
    
  },
  {
    path: 'billing/:id',
    component: Billing,
    data: { title: "Billing Details" },
    
  },
  {
    path: 'newvisit',
    component: VisitNew,
    data: { title: "new visit" },
    
  },
  {
    path: 'visitedit/:id',
    component: VisitEdit,
    data: { title: "new visit" },
    
  },
  {
    path: 'lab/:id',
    component: Lab,
    data: { title: "new visit" },
    
  },
  {
    path: 'scanning/:id',
    component: Scanning,
    data: { title: "new visit" },
    
  },
  {
    path: 'insurance/:id',
    component: Insurance,
    data: { title: "new visit" },
    
  },
  {
    path: 'patientnew',
    component: PatientNew,
    data: { title: "new visit" },
    
  },
  {
    path: 'labview/:id/:labId',
    component: LabView,
    data: { title: "Lab Report View" },
    
  }
];