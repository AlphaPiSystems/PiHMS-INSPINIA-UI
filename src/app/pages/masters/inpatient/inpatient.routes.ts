import { Routes } from '@angular/router';

export const INPATIENT_ROUTES: Routes = [
  {
    path: 'inpatient/doctorprice/list',
    loadComponent: () => import('./doctorpricelist/doctorpricelist').then(c => c.DoctorPriceList),
    data: { title: 'Doctor Price List' }
  },
  {
    path: 'inpatient/doctorprice/add',
    loadComponent: () => import('./doctorpriceadd/doctorpriceadd').then(c => c.DoctorPriceAdd),
    data: { title: 'Add Doctor Price' }
  },
  {
    path: 'inpatient/doctorprice/edit/:id',
    loadComponent: () => import('./doctorpriceadd/doctorpriceadd').then(c => c.DoctorPriceAdd),
    data: { title: 'Edit Doctor Price' }
  }
];
