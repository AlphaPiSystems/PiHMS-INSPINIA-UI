import { Routes } from '@angular/router';
import { Scan } from './components/scan/scan';
import { ScanAdd } from './components/scanadd/scanadd';
import { ScanEdit } from './components/scanedit/scanedit';
import { ScanningItem } from './components/scanningitem/scanningitem';
import { ScanningItemAdd } from './components/scanningitemadd/scanningitemadd';
import { ScanningItemEdit } from './components/scanningitemedit/scanningitemedit';

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
];
