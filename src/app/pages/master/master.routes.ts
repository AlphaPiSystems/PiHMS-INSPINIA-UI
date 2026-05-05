import {Routes} from '@angular/router';
import {MasterComponent} from '@/app/pages/master/master.component';

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        component: MasterComponent,
        data: {title: "Master"},
    },
    {
        path: 'diagnostic-lab',
        loadChildren: () => import('./diagnostic-lab/diagnostic-lab.routes').then((mod) => mod.DIAGNOSTIC_LAB_ROUTES)
    }
];
