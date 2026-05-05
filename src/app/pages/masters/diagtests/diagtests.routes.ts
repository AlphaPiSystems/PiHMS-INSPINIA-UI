import {Routes} from '@angular/router';
import { DiagTest } from './components/diagtest/diagtest';
import { DiagTestAdd } from './components/diagtestadd/diagtestadd';
import { DiagTestEdit } from './components/diagtestedit/diagtestedit';
import { DiagGroup } from './components/diaggroup/diaggroup';
import { DiagGroupEdit } from './components/diaggroupedit/diaggroupedit';
import { TestUnit } from './components/units/unit';
import { UnitEdit } from './components/unitedit/unitedit';
import { UnitAdd } from './components/unitadd/unitadd';
import { Sample } from './components/samples/sample';

export const DIAGNOSTIC_TESTS_ROUTES: Routes = [
    {
        path: 'sample/samplelist',
        component: Sample,
        data: { title: "Sample" },
    },
    {
        path: 'diagtest/diagtestlist',
        component: DiagTest,
        data: {title: "Diagtest"},
    },
    {
        path: 'diagtest/diagtestadd',
        component: DiagTestAdd,
        data: {title: "Diagtest"},
    },
    {
        path: 'diagtest/diagtestadd/:id',
        component: DiagTestAdd,
        data: {title: "Diagtest"},
    },
    {
        path: 'diagtest/diagtestedit/:id',
        component: DiagTestEdit,
        data: {title: "DiagtestEdit"},
    },
    {
        path: 'diaggroup/diaggrouplist',
        component: DiagGroup,
        data: {title: "DiagGroup"},
    },
    {
        path: 'diaggroup/diaggroupedit/:id',
        component: DiagGroupEdit,
        data: {title: "DiagGroupEdit"},
    },
    {
        path: 'unit/unitlist',
        component: TestUnit,
        data: {title: "TestUnit"},
    },
    {
        path: 'unit/unitedit/:id',
        component: UnitEdit,
        data: {title: "UnitEdit"},
    },
    {
        path: 'unit/unitadd',
        component: UnitAdd,
        data: {title: "UnitAdd"},
    },
];
