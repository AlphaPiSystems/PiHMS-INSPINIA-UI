import {Routes} from '@angular/router';
import { DiagTest } from './components/diagtest/diagtest';
import { DiagTestAdd } from './components/diagtestadd/diagtestadd';
import { DiagTestAddHorizontal } from './components/diagtestadd_horizontal/diagtestadd_horizontal';
import { DiagTestAddHorizontalNC } from './components/diagtestadd_horizontal_nc/diagtestadd_horizontal_nc';
import { DiagTestAddND } from './components/diagtestadd_new_design/diagtestadd_new_design';
import { DiagGroup } from './components/diaggroup/diaggroup';

export const DIAGNOSTIC_TESTS_ROUTES: Routes = [
    {
        path: 'diagtest/diagtest',
        component: DiagTest,
        data: {title: "Diagtest"},
    },
    {
        path: 'diagtestadd/diagtestadd/:id',
        component: DiagTestAdd,
        data: {title: "Diagtest"},
    },
    {
        path: 'diagtestadd_horizontal/diagtestadd_horizontal/:id',
        component: DiagTestAddHorizontal,
        data: {title: "DiagtestHorizontal"},
    },
    {
        path: 'diagtestadd_horizontal_nc/diagtestadd_horizontal_nc/:id',
        component: DiagTestAddHorizontalNC,
        data: {title: "DiagtestHorizontalNC"},
    },
    {
        path: 'diagtestadd_new_design/diagtestadd_new_design/:id',
        component: DiagTestAddND,
        data: {title: "DiagTestAddND"},
    },
    {
        path: 'diaggroup/diaggroup',
        component: DiagGroup,
        data: {title: "DiagGroup"},
    },
];
