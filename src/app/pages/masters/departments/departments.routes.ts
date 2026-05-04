import {Routes} from '@angular/router';

export const DEPARTMENTS_ROUTES: Routes = [
    {
        path: 'department/departmentlist',
        loadComponent: () => import('./components/department/department').then(c => c.Department),
        data: {title: "Department"},
    },
    {
        path: 'department/departmentadd',
        loadComponent: () => import('./components/departmentadd/departmentadd').then(c => c.DepartmentAdd)
    },
    {
        path: 'department/departmentedit/:id',
        loadComponent: () => import('./components/departmentedit/departmentedit').then(c => c.DepartmentEdit)
    },
];
// Re-trigger compilation
