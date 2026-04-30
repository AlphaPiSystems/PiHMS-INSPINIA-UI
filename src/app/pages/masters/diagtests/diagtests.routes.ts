import {Routes} from '@angular/router';
import { DiagTest } from './components/diagtest/diagtest';
import { DiagTestAdd } from './components/diagtestadd/diagtestadd';
import { DiagTestAddHorizontal } from './components/diagtestadd_horizontal/diagtestadd_horizontal';
import { DiagTestAddHorizontalNC } from './components/diagtestadd_horizontal_nc/diagtestadd_horizontal_nc';
import { DiagTestAddND } from './components/diagtestadd_new_design/diagtestadd_new_design';
import { DiagGroup } from './components/diaggroup/diaggroup';
import { DiagGroup1 } from './components/diaggroup1/diaggroup1';
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
        path: 'diagtestadd_horizontal/diagtestadd_horizontal/:id',
        component: DiagTestAddHorizontal,
        data: {title: "DiagtestHorizontal"},
    },
    {
        path: 'diagtest/diagtestedit/:id',
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
    {
        path: 'diaggroup/diaggrouplist',
        component: DiagGroup1,
        data: {title: "DiagGroup1"},
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
