import {Routes} from '@angular/router';
import { CLINICAL_ROUTES } from './clinical/clinical.routes';

export const MASTER_ROUTES: Routes = [
    // {
    //     path: 'master',
    //     component: MasterComponent,
    //     data: {title: "Master"},
    // },
    {
        path: '',
        loadChildren: () => import('./diagtests/diagtests.routes').then((mod) => mod.DIAGNOSTIC_TESTS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./staffs/staffs.routes').then((mod) => mod.STAFFS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./hospital/hospital.routes').then((mod) => mod.HOSPITAL_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./departments/departments.routes').then((mod) => mod.DEPARTMENTS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./Misc/misc.routes').then((mod) => mod.MISC_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./scanning/scanning.routes').then((mod) => mod.SCANNING_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./clinical/clinical.routes').then((mod) => mod.CLINICAL_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./housekeeping/housekeeping.routes').then((mod) => mod.HOUSEKEEPING_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./insurance/insurance.routes').then((mod) => mod.INSURANCE_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./patient/patient.routes').then((mod) => mod.PATIENT_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./billing/billing.routes').then((mod) => mod.BILLING_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./inventory/inventory.routes').then((mod) => mod.INVENTORY_ROUTES)
    },
];
