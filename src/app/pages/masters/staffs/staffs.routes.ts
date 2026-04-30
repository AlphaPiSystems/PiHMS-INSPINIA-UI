import {Routes} from '@angular/router';
import { Staff } from './components/staff/staff';

export const STAFFS_ROUTES: Routes = [
    {
        path: 'staff/stafflist',
        component: Staff,
        data: {title: "Staff"},
    },
    {
        path: 'staff/staffadd',
        loadComponent: () => import('./components/staffadd/staffadd').then(c => c.StaffAdd)
    },
    {
        path: 'staff/staffedit/:id',
        loadComponent: () => import('./components/staffedit/staffedit').then(c => c.StaffEdit)
    }
];
