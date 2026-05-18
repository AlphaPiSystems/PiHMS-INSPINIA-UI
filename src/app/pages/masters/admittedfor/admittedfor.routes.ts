import { Routes } from '@angular/router';

export const ADMITTED_FOR_ROUTES: Routes = [
  {
    path: 'admittedfor/admittedforlist',
    loadComponent: () => import('./components/admittedforlist/admittedforlist').then(c => c.AdmittedForList),
    data: { title: 'Admitted For List' }
  },
  {
    path: 'admittedfor/admittedforadd',
    loadComponent: () => import('./components/admittedforadd/admittedforadd').then(c => c.AdmittedForAdd),
    data: { title: 'Add Admitted For' }
  },
  {
    path: 'admittedfor/admittedforedit/:id',
    loadComponent: () => import('./components/admittedforadd/admittedforadd').then(c => c.AdmittedForAdd),
    data: { title: 'Edit Admitted For' }
  }
];
