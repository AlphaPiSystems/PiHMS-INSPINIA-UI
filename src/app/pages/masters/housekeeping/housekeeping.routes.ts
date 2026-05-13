import { Routes } from '@angular/router';
import { Housekeeping } from './components/housekeeping/housekeeping';
import { HousekeepingAdd } from './components/housekeepingadd/housekeepingadd';
import { HousekeepingEdit } from './components/housekeepingedit/housekeepingedit';

export const HOUSEKEEPING_ROUTES: Routes = [
  {
    path: 'housekeeping/housekeepinglist',
    component: Housekeeping,
    data: { title: 'Tasks' }
  },
  {
    path: 'housekeeping/housekeepingadd',
    component: HousekeepingAdd,
    data: { title: 'Add Task' }
  },
  {
    path: 'housekeeping/housekeepingedit/:id',
    component: HousekeepingEdit,
    data: { title: 'Edit Task' }
  }
];
