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
    },
    // Earning Routes
    {
        path: 'staff/earning/earninglist',
        loadComponent: () => import('./components/earning/earning').then(c => c.StaffEarningList),
        data: { title: 'Staff Earnings' }
    },
    {
        path: 'staff/earning/earningadd',
        loadComponent: () => import('./components/earningadd/earningadd').then(c => c.StaffEarningAdd),
        data: { title: 'Add Staff Earning' }
    },
    {
        path: 'staff/earning/earningedit/:id',
        loadComponent: () => import('./components/earningedit/earningedit').then(c => c.StaffEarningEdit),
        data: { title: 'Edit Staff Earning' }
    }
];
