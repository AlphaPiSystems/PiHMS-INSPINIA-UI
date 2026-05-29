import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { COUNTRY_DATA } from './country-list.component';

@Component({
  selector: 'app-country-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './country-edit.component.html',
})
export class CountryEditComponent implements OnInit {
  countryId: string | null = null;
  country: any = {
    id: null,
    Name: '',
    IsSupported: 'Y',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.countryId = params['id'];
        this.loadCountry(this.countryId);
      }
    });
  }

  loadCountry(id: string | null): void {
    if (id) {
      const found = COUNTRY_DATA.find(c => c.id === Number(id));
      if (found) {
        this.country = { ...found };
      }
    }
  }

  updateCountry(): void {
    console.log('Country updated:', this.country);
    this.router.navigate(['/master/misc/country-list']);
  }
}
