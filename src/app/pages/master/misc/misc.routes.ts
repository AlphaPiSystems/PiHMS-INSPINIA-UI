import { Routes } from '@angular/router';

export const MISC_ROUTES: Routes = [
    {
        path: 'country-list',
        loadComponent: () => import('./country/country-list.component').then(m => m.CountryListComponent),
        data: { title: 'Countries List' }
    },
    {
        path: 'country-new',
        loadComponent: () => import('./country/country-new.component').then(m => m.CountryNewComponent),
        data: { title: 'New Country' }
    },
    {
        path: 'country-edit',
        loadComponent: () => import('./country/country-edit.component').then(m => m.CountryEditComponent),
        data: { title: 'Edit Country' }
    },
    {
        path: 'state-list',
        loadComponent: () => import('./state/state-list.component').then(m => m.StateListComponent),
        data: { title: 'States List' }
    },
    {
        path: 'state-new',
        loadComponent: () => import('./state/state-new.component').then(m => m.StateNewComponent),
        data: { title: 'New State' }
    },
    {
        path: 'state-edit',
        loadComponent: () => import('./state/state-edit.component').then(m => m.StateEditComponent),
        data: { title: 'Edit State' }
    },
    {
        path: 'district-list',
        loadComponent: () => import('./district/district-list.component').then(m => m.DistrictListComponent),
        data: { title: 'Districts List' }
    },
    {
        path: 'district-new',
        loadComponent: () => import('./district/district-new.component').then(m => m.DistrictNewComponent),
        data: { title: 'New District' }
    },
    {
        path: 'district-edit',
        loadComponent: () => import('./district/district-edit.component').then(m => m.DistrictEditComponent),
        data: { title: 'Edit District' }
    },
    {
        path: 'city-list',
        loadComponent: () => import('./city/city-list.component').then(m => m.CityListComponent),
        data: { title: 'Cities List' }
    },
    {
        path: 'city-new',
        loadComponent: () => import('./city/city-new.component').then(m => m.CityNewComponent),
        data: { title: 'New City' }
    },
    {
        path: 'city-edit',
        loadComponent: () => import('./city/city-edit.component').then(m => m.CityEditComponent),
        data: { title: 'Edit City' }
    },
    {
        path: 'postal-code-list',
        loadComponent: () => import('./postal-code/postal-code-list.component').then(m => m.PostalCodeListComponent),
        data: { title: 'Postal Codes List' }
    },
    {
        path: 'postal-code-new',
        loadComponent: () => import('./postal-code/postal-code-new.component').then(m => m.PostalCodeNewComponent),
        data: { title: 'New Postal Code' }
    },
    {
        path: 'postal-code-edit',
        loadComponent: () => import('./postal-code/postal-code-edit.component').then(m => m.PostalCodeEditComponent),
        data: { title: 'Edit Postal Code' }
    },
    {
        path: 'bank-list',
        loadComponent: () => import('./bank/bank-list.component').then(m => m.BankListComponent),
        data: { title: 'Banks List' }
    },
    {
        path: 'bank-new',
        loadComponent: () => import('./bank/bank-new.component').then(m => m.BankNewComponent),
        data: { title: 'New Bank' }
    },
    {
        path: 'bank-edit',
        loadComponent: () => import('./bank/bank-edit.component').then(m => m.BankEditComponent),
        data: { title: 'Edit Bank' }
    }
];






