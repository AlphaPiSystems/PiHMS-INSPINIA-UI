import { Routes } from '@angular/router';
import { Scan } from './components/scan/scan';
import { ScanAdd } from './components/scanadd/scanadd';
import { ScanEdit } from './components/scanedit/scanedit';
import { ScanningItem } from './components/scanningitem/scanningitem';
import { ScanningItemAdd } from './components/scanningitemadd/scanningitemadd';
import { ScanningItemEdit } from './components/scanningitemedit/scanningitemedit';
import { ScanningTemplate } from './components/scanningtemplate/scanningtemplate';
import { ScanningTemplateAdd } from './components/scanningtemplateadd/scanningtemplateadd';
import { ScanningTemplateEdit } from './components/scanningtemplateedit/scanningtemplateedit';

export const SCANNING_ROUTES: Routes = [
    {
        path: 'scanning/scanlist',
        component: Scan,
        data: { title: "Scan" },
    },
    {
        path: 'scanning/scanadd',
        component: ScanAdd,
        data: { title: "ScanAdd" },
    },
    {
        path: 'scanning/scanedit/:id',
        component: ScanEdit,
        data: { title: "ScanEdit" },
    },
    {
        path: 'scanning/scanningitemlist',
        component: ScanningItem,
        data: { title: "ScanningItem" },
    },
    {
        path: 'scanning/scanningitemadd',
        component: ScanningItemAdd,
        data: { title: "ScanningItemAdd" },
    },
    {
        path: 'scanning/scanningitemedit/:id',
        component: ScanningItemEdit,
        data: { title: "ScanningItemEdit" },
    },
    {
        path: 'scanning/scanningtemplatelist',
        component: ScanningTemplate,
        data: { title: "ScanningTemplate" },
    },
    {
        path: 'scanning/scanningtemplateadd',
        component: ScanningTemplateAdd,
        data: { title: "ScanningTemplateAdd" },
    },
    {
        path: 'scanning/scanningtemplateedit/:id',
        component: ScanningTemplateEdit,
        data: { title: "ScanningTemplateEdit" },
    },
];
