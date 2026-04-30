import {Routes} from '@angular/router';

export const MASTER_ROUTES: Routes = [
    // {
    //     path: 'master',
    //     component: MasterComponent,
    //     data: {title: "Master"},
    // },
    {
        path: '',
        loadChildren: () => import('./diagtests/diagtests.routes').then((mod) => mod.DIAGNOSTIC_TESTS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./staffs/staffs.routes').then((mod) => mod.STAFFS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./hospital/hospital.routes').then((mod) => mod.HOSPITAL_ROUTES)
    },
];
