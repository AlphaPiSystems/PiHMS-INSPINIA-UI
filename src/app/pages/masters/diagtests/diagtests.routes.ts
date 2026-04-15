import {Routes} from '@angular/router';
import { DiagTest } from './components/diagtest/diagtest';
import { DiagTestAdd } from './components/diagtestadd/diagtestadd';

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
];
