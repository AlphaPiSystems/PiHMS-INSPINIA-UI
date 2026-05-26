import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestNewComponent } from './test-new/test-new.component';
import { TestGroupsComponent } from './test-groups/test-groups.component';
import { SamplesComponent } from './samples/samples.component';
import { UnitsComponent } from './units/units.component';
import { TestGroupsEdit } from './test-groups-edit/test-groups-edit';

export const DIAGNOSTIC_LAB_ROUTES: Routes = [
    {
        path: 'test-list',
        component: TestComponent,
        data: { title: "Test" },
    },
    {
        path: 'test-new',
        component: TestNewComponent,
        data: { title: "New Test" },
    },
    {
        path: 'test-groups-list',
        component: TestGroupsComponent,
        data: { title: "Test Groups" },
    },
    {
        path: 'test-groups-edit',
        component: TestGroupsEdit,
        data: { title: "Edit Test Group" },
    },
    {
        path: 'test-groups-edit/:id',
        component: TestGroupsEdit,
        data: { title: "Edit Test Group" },
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
