import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestGroupsComponent } from './test-groups/test-groups.component';
import { SamplesComponent } from './samples/samples.component';
import { UnitsComponent } from './units/units.component';

export const DIAGNOSTIC_LAB_ROUTES: Routes = [
    {
        path: 'test-list',
        component: TestComponent,
        data: { title: "Test" },
    },
    {
        path: 'test-groups-list',
        component: TestGroupsComponent,
        data: { title: "Test Groups" },
    },
    {
        path: 'samples-list',
        component: SamplesComponent,
        data: { title: "Samples" },
    },
    {
        path: 'units-list',
        component: UnitsComponent,
        data: { title: "Units" },
    }
];
