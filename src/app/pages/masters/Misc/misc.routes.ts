import { Routes } from '@angular/router';
import { City } from './City/city/city';
import { CityAdd } from './City/cityadd/cityadd';
import { CityEdit } from './City/cityedit/cityedit';
import { Country } from './Country/country/country';
import { CountryAdd } from './Country/countryadd/countryadd';
import { CountryEdit } from './Country/countryedit/countryedit';
import { District } from './District/district/district';
import { DistrictAdd } from './District/districtadd/districtadd';
import { DistrictEdit } from './District/districtedit/districtedit';
import { State } from './State/state/state';
import { StateAdd } from './State/stateadd/stateadd';
import { StateEdit } from './State/stateedit/stateedit';
import { PostalCode } from './PostalCode/postalcode/postalcode';
import { PostalCodeAdd } from './PostalCode/postalcodeadd/postalcodeadd';
import { PostalCodeEdit } from './PostalCode/postalcodeedit/postalcodeedit';
import { Bank } from './Bank/bank/bank';
import { BankAdd } from './Bank/bankadd/bankadd';
import { BankEdit } from './Bank/bankedit/bankedit';
import { InsuranceProvider } from './InsuranceProvider/insuranceprovider/insuranceprovider';
import { InsuranceProviderAdd } from './InsuranceProvider/insuranceprovideradd/insuranceprovideradd';
import { InsuranceProviderEdit } from './InsuranceProvider/insuranceprovideredit/insuranceprovideredit';

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
  },
  {
    path: 'misc/district/districtlist',
    component: District,
    data: { title: 'District List' }
  },
  {
    path: 'misc/district/districtadd',
    component: DistrictAdd,
    data: { title: 'Add District' }
  },
  {
    path: 'misc/district/districtedit/:id',
    component: DistrictEdit,
    data: { title: 'Edit District' }
  },
  {
    path: 'misc/state/statelist',
    component: State,
    data: { title: 'State List' }
  },
  {
    path: 'misc/state/stateadd',
    component: StateAdd,
    data: { title: 'Add State' }
  },
  {
    path: 'misc/state/stateedit/:id',
    component: StateEdit,
    data: { title: 'Edit State' }
  },
  {
    path: 'misc/postalcode/postalcodelist',
    component: PostalCode,
    data: { title: 'Postal Code List' }
  },
  {
    path: 'misc/postalcode/postalcodeadd',
    component: PostalCodeAdd,
    data: { title: 'Add Postal Code' }
  },
  {
    path: 'misc/postalcode/postalcodeedit/:id',
    component: PostalCodeEdit,
    data: { title: 'Edit Postal Code' }
  },
  {
    path: 'misc/bank/banklist',
    component: Bank,
    data: { title: 'Bank List' }
  },
  {
    path: 'misc/bank/bankadd',
    component: BankAdd,
    data: { title: 'Add Bank' }
  },
  {
    path: 'misc/bank/bankedit/:id',
    component: BankEdit,
    data: { title: 'Edit Bank' }
  },
  {
    path: 'misc/insuranceprovider/insuranceproviderlist',
    component: InsuranceProvider,
    data: { title: 'Insurance Providers' }
  },
  {
    path: 'misc/insuranceprovider/insuranceprovideradd',
    component: InsuranceProviderAdd,
    data: { title: 'Add Provider' }
  },
  {
    path: 'misc/insuranceprovider/insuranceprovideredit/:id',
    component: InsuranceProviderEdit,
    data: { title: 'Edit Provider' }
  }
];
