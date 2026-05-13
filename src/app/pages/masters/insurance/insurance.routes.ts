import { Routes } from '@angular/router';
import { Insurance } from './components/insurance/insurance';
import { InsuranceAdd } from './components/insuranceadd/insuranceadd';
import { InsuranceEdit } from './components/insuranceedit/insuranceedit';

export const INSURANCE_ROUTES: Routes = [
  {
    path: 'insurance/insurancelist',
    component: Insurance,
    data: { title: 'Insurance' }
  },
  {
    path: 'insurance/insuranceadd',
    component: InsuranceAdd,
    data: { title: 'Add Insurance' }
  },
  {
    path: 'insurance/insuranceedit/:id',
    component: InsuranceEdit,
    data: { title: 'Edit Insurance' }
  }
];
