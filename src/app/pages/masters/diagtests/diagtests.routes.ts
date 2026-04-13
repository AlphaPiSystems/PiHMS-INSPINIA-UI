import {Routes} from '@angular/router';
import { Diagtest } from './components/diagtest/diagtest';

export const DIAGNOSTIC_TESTS_ROUTES: Routes = [
    {
        path: 'diagtest/diagtest',
        component: Diagtest,
        data: {title: "Diagtest"},
    },
];
