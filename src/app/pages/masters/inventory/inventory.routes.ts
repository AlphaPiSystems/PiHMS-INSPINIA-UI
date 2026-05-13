import { Routes } from '@angular/router';

export const INVENTORY_ROUTES: Routes = [
  // Item Routes
  {
    path: 'inventory/item/itemlist',
    loadComponent: () => import('./components/item/item').then(c => c.ItemList),
    data: { title: 'Item List' }
  },
  {
    path: 'inventory/item/itemadd',
    loadComponent: () => import('./components/itemadd/itemadd').then(c => c.ItemAdd),
    data: { title: 'Add Item' }
  },
  {
    path: 'inventory/item/itemedit/:id',
    loadComponent: () => import('./components/itemedit/itemedit').then(c => c.ItemEdit),
    data: { title: 'Edit Item' }
  },
  // Vendor Routes
  {
    path: 'inventory/vendor/vendorlist',
    loadComponent: () => import('./components/vendor/vendor').then(c => c.VendorList),
    data: { title: 'Vendor List' }
  },
  {
    path: 'inventory/vendor/vendoradd',
    loadComponent: () => import('./components/vendoradd/vendoradd').then(c => c.VendorAdd),
    data: { title: 'Add Vendor' }
  },
  {
    path: 'inventory/vendor/vendoredit/:id',
    loadComponent: () => import('./components/vendoredit/vendoredit').then(c => c.VendorEdit),
    data: { title: 'Edit Vendor' }
  },
  // Inventory Department Routes (Renamed Folders/Files)
  {
    path: 'inventory/invdepartment/invdepartmentlist',
    loadComponent: () => import('./components/invdepartment/invdepartment').then(c => c.InvDepartmentList),
    data: { title: 'Inventory Department List' }
  },
  {
    path: 'inventory/invdepartment/invdepartmentadd',
    loadComponent: () => import('./components/invdepartmentadd/invdepartmentadd').then(c => c.InvDepartmentAdd),
    data: { title: 'Add Inventory Department' }
  },
  {
    path: 'inventory/invdepartment/invdepartmentedit/:id',
    loadComponent: () => import('./components/invdepartmentedit/invdepartmentedit').then(c => c.InvDepartmentEdit),
    data: { title: 'Edit Inventory Department' }
  }
];
