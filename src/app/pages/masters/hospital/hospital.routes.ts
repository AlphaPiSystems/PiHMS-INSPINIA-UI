import {Routes} from '@angular/router';
import { Floor } from './components/floor/floor';
import { HospitalBuilding } from './components/hospitalbuilding/hospitalbuilding';

export const HOSPITAL_ROUTES: Routes = [
    {
        path: 'floor/floorlist',
        component: Floor,
        data: {title: "Floor"},
    },
    {
        path: 'building/buildinglist',
        component: HospitalBuilding,
        data: {title: "Hospital Building"},
    },
    {
        path: 'floor/flooradd',
        loadComponent: () => import('./components/flooradd/flooradd').then(c => c.FloorAdd)
    },
    {
        path: 'floor/flooredit/:id',
        loadComponent: () => import('./components/flooredit/flooredit').then(c => c.FloorEdit)
    },
    {
        path: 'building/buildingadd',
        loadComponent: () => import('./components/hospitalbuildingadd/hospitalbuildingadd').then(c => c.HospitalBuildingAdd)
    },
  {
    path: 'floor/floorview/:id',
    loadComponent: () => import('./components/floorview/floorview').then(c => c.FloorView),
    data: { title: 'View' }
  },
    {
        path: 'building/buildingedit/:id',
        loadComponent: () => import('./components/hospitalbuildingedit/hospitalbuildingedit').then(c => c.HospitalBuildingEdit)
    },
    {
        path: 'ward/wardlist',
        loadComponent: () => import('./components/ward/ward').then(c => c.Ward),
        data: {title: "Ward"}
    },
    // Hospital Building View Route
    {
        path: 'building/buildingview/:id',
        loadComponent: () => import('./components/hospitalbuildingview/hospitalbuildingview').then(c => c.HospitalBuildingView),
        data: { title: 'View' }
    },
    {
        path: 'ward/wardadd',
        loadComponent: () => import('./components/wardadd/wardadd').then(c => c.WardAdd)
    },
    {
        path: 'ward/wardedit/:id',
        loadComponent: () => import('./components/wardedit/wardedit').then(c => c.WardEdit)
    },
    {
        path: 'wardbed/wardbedlist',
        loadComponent: () => import('./components/wardbed/wardbed').then(c => c.WardBed),
        data: {title: "Ward Bed"}
    },
    {
        path: 'ward/wardview/:id',
        loadComponent: () => import('./components/wardview/wardview').then(c => c.WardView),
        data: { title: 'View' }
    },
    {
        path: 'wardbed/wardbedadd',
        loadComponent: () => import('./components/wardbedadd/wardbedadd').then(c => c.WardBedAdd)
    },
    {
        path: 'wardbed/wardbededit/:id',
        loadComponent: () => import('./components/wardbededit/wardbededit').then(c => c.WardBedEdit)
    },
    {
        path: 'wardtype/wardtypelist',
        loadComponent: () => import('./components/wardtype/wardtype').then(c => c.WardType),
        data: {title: "Ward Type"}
    },
    {
        path: 'wardbed/wardbedview/:id',
        loadComponent: () => import('./components/wardbedview/wardbedview').then(c => c.WardBedView),
        data: { title: 'View' }
    },
    {
        path: 'wardtype/wardtypeadd',
        loadComponent: () => import('./components/wardtypeadd/wardtypeadd').then(c => c.WardTypeAdd)
    },
    {
        path: 'wardtype/wardtypeedit/:id',
        loadComponent: () => import('./components/wardtypeedit/wardtypeedit').then(c => c.WardTypeEdit)
    },
    {
        path: 'wardtype/wardtypeview/:id',
        loadComponent: () => import('./components/wardtypeview/wardtypeview').then(c => c.WardTypeView),
        data: { title: 'View' }
    }
];
