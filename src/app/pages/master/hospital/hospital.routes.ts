import { Routes } from '@angular/router';

export const HOSPITAL_ROUTES: Routes = [
    {
        path: 'building-list',
        loadComponent: () => import('./building/building-list.component').then(m => m.BuildingListComponent),
        data: { title: 'Buildings List' }
    },
    {
        path: 'building-new',
        loadComponent: () => import('./building/building-new.component').then(m => m.BuildingNewComponent),
        data: { title: 'New Building' }
    },
    {
        path: 'building-edit',
        loadComponent: () => import('./building/building-edit.component').then(m => m.BuildingEditComponent),
        data: { title: 'Edit Building' }
    },
    {
        path: 'floor-list',
        loadComponent: () => import('./floor/floor-list.component').then(m => m.FloorListComponent),
        data: { title: 'Floors List' }
    },
    {
        path: 'floor-new',
        loadComponent: () => import('./floor/floor-new.component').then(m => m.FloorNewComponent),
        data: { title: 'New Floor' }
    },
    {
        path: 'floor-edit',
        loadComponent: () => import('./floor/floor-edit.component').then(m => m.FloorEditComponent),
        data: { title: 'Edit Floor' }
    },
    {
        path: 'ward-type-list',
        loadComponent: () => import('./ward-type/ward-type-list.component').then(m => m.WardTypeListComponent),
        data: { title: 'Ward Types List' }
    },
    {
        path: 'ward-type-new',
        loadComponent: () => import('./ward-type/ward-type-new.component').then(m => m.WardTypeNewComponent),
        data: { title: 'New Ward Type' }
    },
    {
        path: 'ward-type-edit',
        loadComponent: () => import('./ward-type/ward-type-edit.component').then(m => m.WardTypeEditComponent),
        data: { title: 'Edit Ward Type' }
    },
    {
        path: 'ward-list',
        loadComponent: () => import('./ward/ward-list.component').then(m => m.WardListComponent),
        data: { title: 'Wards List' }
    },
    {
        path: 'ward-new',
        loadComponent: () => import('./ward/ward-new.component').then(m => m.WardNewComponent),
        data: { title: 'New Ward' }
    },
    {
        path: 'ward-edit',
        loadComponent: () => import('./ward/ward-edit.component').then(m => m.WardEditComponent),
        data: { title: 'Edit Ward' }
    },
    {
        path: 'ward-bed-list',
        loadComponent: () => import('./ward-bed/ward-bed-list.component').then(m => m.WardBedListComponent),
        data: { title: 'Ward Beds List' }
    },
    {
        path: 'ward-bed-new',
        loadComponent: () => import('./ward-bed/ward-bed-new.component').then(m => m.WardBedNewComponent),
        data: { title: 'New Ward Bed' }
    },
    {
        path: 'ward-bed-edit',
        loadComponent: () => import('./ward-bed/ward-bed-edit.component').then(m => m.WardBedEditComponent),
        data: { title: 'Edit Ward Bed' }
    }
];




