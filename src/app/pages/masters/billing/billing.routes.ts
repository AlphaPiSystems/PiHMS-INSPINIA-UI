import { Routes } from '@angular/router';
import { BillDomain } from './components/billdomain/billdomain';
import { BillDomainAdd } from './components/billdomainadd/billdomainadd';
import { BillDomainEdit } from './components/billdomainedit/billdomainedit';
import { BillItem } from './components/billitem/billitem';
import { BillItemAdd } from './components/billitemadd/billitemadd';
import { BillItemEdit } from './components/billitemedit/billitemedit';

export const BILLING_ROUTES: Routes = [
  {
    path: 'bill-domain',
    children: [
      { path: 'bill-domainlist', component: BillDomain, data: { title: 'Bill Domain List' } },
      { path: 'bill-domainadd', component: BillDomainAdd, data: { title: 'Add Bill Domain' } },
      { path: 'bill-domainedit/:id', component: BillDomainEdit, data: { title: 'Edit Bill Domain' } },
    ]
  },
  {
    path: 'bill-item',
    children: [
      { path: 'bill-itemlist', component: BillItem, data: { title: 'Bill Item List' } },
      { path: 'bill-itemadd', component: BillItemAdd, data: { title: 'Add Bill Item' } },
      { path: 'bill-itemedit/:id', component: BillItemEdit, data: { title: 'Edit Bill Item' } },
    ]
  }
];
