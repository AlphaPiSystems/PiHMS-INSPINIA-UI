import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DecimalPipe } from '@angular/common'
import {provideDaterangepickerLocale} from 'ngx-daterangepicker-bootstrap';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [DecimalPipe,provideDaterangepickerLocale(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
