import { Routes } from '@angular/router';
import { TestListComponent } from './test/test-list.component';
import { TestNewComponent } from './test/test-new.component';
import { TestGroupListComponent } from './test-group/test-group-list.component';
import { SampleListComponent } from './sample/sample-list.component';
import { SampleNewComponent } from './sample/sample-new.component';
import { SampleEditComponent } from './sample/sample-edit.component';
import { UnitListComponent } from './unit/unit-list.component';
import { UnitNewComponent } from './unit/unit-new.component';
import { UnitEditComponent } from './unit/unit-edit.component';
import { TestGroupEdit } from './test-group/test-group-edit';
import { TestGroupNew } from './test-group/test-group-new';
import { InstrumentListComponent } from './Instrument/instrument-list.component';

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
        path: 'test-group-new',
        component: TestGroupNew,
        data: { title: "New Test Group" },
    },
    {
        path: 'sample-list',
        component: SampleListComponent,
        data: { title: "Sample" },
    },
    {
        path: 'sample-new',
        component: SampleNewComponent,
        data: { title: "New Sample" },
    },
    {
        path: 'sample-edit',
        component: SampleEditComponent,
        data: { title: "Edit Sample" },
    },
    {
        path: 'unit-list',
        component: UnitListComponent,
        data: { title: "Units" },
    },
    {
        path: 'unit-new',
        component: UnitNewComponent,
        data: { title: "New Unit" },
    },
    {
        path: 'unit-edit',
        component: UnitEditComponent,
        data: { title: "Edit Unit" },
    },
    {
        path: 'instrument-list',
        component: InstrumentListComponent,
        data: { title: "Instruments" },
    }
];
