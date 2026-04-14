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
];
