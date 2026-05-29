import { Routes } from '@angular/router';
import { MasterComponent } from '@/app/pages/master/master.component';

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        component: MasterComponent,
        data: { title: "Master" },
    },
    {
        path: 'hospital',
        loadChildren: () => import('./hospital/hospital.routes').then((mod) => mod.HOSPITAL_ROUTES)
    },
    {
        path: 'diagnostic-lab',
        loadChildren: () => import('./diagnostic-lab/diagnostic-lab.routes').then((mod) => mod.DIAGNOSTIC_LAB_ROUTES)
    },
    {
        path: 'misc',
        loadChildren: () => import('./misc/misc.routes').then((mod) => mod.MISC_ROUTES)
    },
    {
        path: 'department',
        loadChildren: () => import('./Inventory/department/department.routes').then((mod) => mod.DEPARTMENT_ROUTES)
    }
];
