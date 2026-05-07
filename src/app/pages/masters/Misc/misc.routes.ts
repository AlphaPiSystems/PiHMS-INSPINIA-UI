import { Routes } from '@angular/router';
import { City } from './City/city/city';
import { CityAdd } from './City/cityadd/cityadd';
import { CityEdit } from './City/cityedit/cityedit';
import { Country } from './Country/country/country';
import { CountryAdd } from './Country/countryadd/countryadd';
import { CountryEdit } from './Country/countryedit/countryedit';

export const MISC_ROUTES: Routes = [
  {
    path: 'misc/city/citylist',
    component: City,
    data: { title: 'City List' }
  },
  {
    path: 'misc/city/cityadd',
    component: CityAdd,
    data: { title: 'Add City' }
  },
  {
    path: 'misc/city/cityedit/:id',
    component: CityEdit,
    data: { title: 'Edit City' }
  },
  {
    path: 'misc/country/countrylist',
    component: Country,
    data: { title: 'Country List' }
  },
  {
    path: 'misc/country/countryadd',
    component: CountryAdd,
    data: { title: 'Add Country' }
  },
  {
    path: 'misc/country/countryedit/:id',
    component: CountryEdit,
    data: { title: 'Edit Country' }
  }
];
