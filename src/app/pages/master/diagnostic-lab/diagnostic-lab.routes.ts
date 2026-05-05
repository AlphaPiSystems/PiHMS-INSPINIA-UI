import {Routes} from '@angular/router';
import {TestComponent} from './test/test.component';
import {TestGroupsComponent} from './test-groups/test-groups.component';
import {SamplesComponent} from './samples/samples.component';
import {UnitsComponent} from './units/units.component';

export const DIAGNOSTIC_LAB_ROUTES: Routes = [
    {
        path: 'test',
        component: TestComponent,
        data: {title: "Test"},
    },
    {
        path: 'test-groups',
        component: TestGroupsComponent,
        data: {title: "Test Groups"},
    },
    {
        path: 'samples',
        component: SamplesComponent,
        data: {title: "Samples"},
    },
    {
        path: 'units',
        component: UnitsComponent,
        data: {title: "Units"},
    }
];
