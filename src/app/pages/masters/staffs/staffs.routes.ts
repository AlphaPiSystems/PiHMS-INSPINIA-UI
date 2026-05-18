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
    // Role Routes
    {
        path: 'staff/rolelist',
        loadComponent: () => import('./components/role/role').then(c => c.Role),
        data: {title: "Role List"}
    },
    {
        path: 'staff/roleadd',
        loadComponent: () => import('./components/roleadd/roleadd').then(c => c.RoleAdd),
        data: {title: "Add Role"}
    },
    {
        path: 'staff/roleedit/:id',
        loadComponent: () => import('./components/roleedit/roleedit').then(c => c.RoleEdit),
        data: {title: "Edit Role"}
    },
    // Payroll Routes
    {
        path: 'staff/payroll/payrolllist',
        loadComponent: () => import('./components/payroll/payroll').then(c => c.StaffPayrollList),
        data: { title: 'Staff Payroll Details' }
    },
    {
        path: 'staff/payroll/payrolladd',
        loadComponent: () => import('./components/payrolladd/payrolladd').then(c => c.StaffPayrollAdd),
        data: { title: 'Add Staff Payroll Details' }
    },
    {
        path: 'staff/payroll/payrolledit/:id',
        loadComponent: () => import('./components/payrolledit/payrolledit').then(c => c.StaffPayrollEdit),
        data: { title: 'Edit Staff Payroll Details' }
    }
];
