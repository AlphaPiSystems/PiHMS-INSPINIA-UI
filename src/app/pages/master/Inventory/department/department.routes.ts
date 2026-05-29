import { Routes } from '@angular/router';

export const DEPARTMENT_ROUTES: Routes = [
    {
        path: 'department-list',
        loadComponent: () => import('./department-list.component').then(m => m.DepartmentListComponent),
        data: { title: 'Departments List' }
    },
    {
        path: 'department-new',
        loadComponent: () => import('./department-new.component').then(m => m.DepartmentNewComponent),
        data: { title: 'New Department' }
    },
    {
        path: 'department-edit',
        loadComponent: () => import('./department-edit.component').then(m => m.DepartmentEditComponent),
        data: { title: 'Edit Department' }
    }
];
