import { Routes } from '@angular/router';
import { TestListComponent } from './test/test-list.component';
import { TestNewComponent } from './test/test-new.component';
import { TestGroupListComponent } from './test-group/test-group-list.component';
import { SamplesComponent } from './samples/samples.component';
import { UnitsComponent } from './units/units.component';
import { TestGroupEdit } from './test-group/test-group-edit';

export const DIAGNOSTIC_LAB_ROUTES: Routes = [
    {
        path: 'test-list',
        component: TestListComponent,
        data: { title: "Test" },
    },
    {
        path: 'test-new',
        component: TestNewComponent,
        data: { title: "New Test" },
    },
    {
        path: 'test-group-list',
        component: TestGroupListComponent,
        data: { title: "Test Groups" },
    },
    {
        path: 'test-group-edit/:id',
        component: TestGroupEdit,
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
