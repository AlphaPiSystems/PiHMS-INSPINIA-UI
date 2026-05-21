import { Routes } from '@angular/router';

export const PHARMACY_ROUTES: Routes = [
    {
        path: 'pharmacy/pharmacylist',
        loadComponent: () => import('./components/pharmacy/pharmacy').then(c => c.Pharmacy),
        data: { title: 'Pharmacy List' }
    },
    {
        path: 'pharmacy/pharmacyadd',
        loadComponent: () => import('./components/pharmacyadd/pharmacyadd').then(c => c.PharmacyAdd),
        data: { title: 'Add Pharmacy Item' }
    },
    {
        path: 'pharmacy/pharmacyedit',
        loadComponent: () => import('./components/pharmacyedit/pharmacyedit').then(c => c.PharmacyEdit),
        data: { title: 'Edit Pharmacy Item' }
    },
    {
        path: 'pharmacy/pharmacyview',
        loadComponent: () => import('./components/pharmacyview/pharmacyview').then(c => c.PharmacyView),
        data: { title: 'View Pharmacy Item' }
    }
];
