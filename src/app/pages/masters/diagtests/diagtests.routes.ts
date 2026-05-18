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
import { SampleAdd } from './components/sampleadd/sampleadd';
import { SampleEdit } from './components/sampleedit/sampleedit';
import { Instrument } from './components/instruments/instrument';
import { InstrumentAdd } from './components/instrumentadd/instrumentadd';
import { InstrumentEdit } from './components/instrumentedit/instrumentedit';
import { TestTemplate } from './components/testtemplate/testtemplate';
import { TestTemplateAdd } from './components/testtemplateadd/testtemplateadd';
import { TestTemplateEdit } from './components/testtemplateedit/testtemplateedit';


export const DIAGNOSTIC_TESTS_ROUTES: Routes = [
    {
        path: 'sample/samplelist',
        component: Sample,
        data: { title: "Sample" },
    },
    {
        path: 'sample/sampleadd',
        component: SampleAdd,
        data: { title: "SampleAdd" },
    },
    {
        path: 'sample/sampleedit/:id',
        component: SampleEdit,
        data: { title: "SampleEdit" },
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
    {
        path: 'instrument/instrumentlist',
        component: Instrument,
        data: {title: "Instrument"},
    },
    {
        path: 'instrument/instrumentadd',
        component: InstrumentAdd,
        data: {title: "InstrumentAdd"},
    },
    {
        path: 'instrument/instrumentedit/:id',
        component: InstrumentEdit,
        data: {title: "InstrumentEdit"},
    },
    {
        path: 'testtemplate/testtemplatelist',
        component: TestTemplate,
        data: {title: "TestTemplate"},
    },
    {
        path: 'testtemplate/testtemplateadd',
        component: TestTemplateAdd,
        data: {title: "TestTemplateAdd"},
    },
    {
        path: 'testtemplate/testtemplateedit/:id',
        component: TestTemplateEdit,
        data: {title: "TestTemplateEdit"},
    },
    {
        path: 'testtemplate',
        redirectTo: 'testtemplate/testtemplatelist',
        pathMatch: 'full'
    }
];
