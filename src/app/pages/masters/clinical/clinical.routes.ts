import { Routes } from '@angular/router';
import { Surgery } from './components/surgery/surgery';
import { SurgeryAdd } from './components/surgeryadd/surgeryadd';
import { SurgeryEdit } from './components/surgeryedit/surgeryedit';

export const CLINICAL_ROUTES: Routes = [
    {
        path: 'clinical/surgerylist',
        component: Surgery,
        data: { title: "Surgery" },
    },
    {
        path: 'clinical/surgeryadd',
        component: SurgeryAdd,
        data: { title: "SurgeryAdd" },
    },
    {
        path: 'clinical/surgeryedit/:id',
        component: SurgeryEdit,
        data: { title: "SurgeryEdit" },
    },
];
