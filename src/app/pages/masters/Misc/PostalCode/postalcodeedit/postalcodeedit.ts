import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postalcodeedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './postalcodeedit.html',
})
export class PostalCodeEdit implements OnInit {
  postalCode: any = {};
  cities: any[] = [];
  districts: any[] = [];
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.cities = data.city || [];
        this.districts = data.district || [];
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.postalcode) {
          const found = data.postalcode.find((pc: any) => pc.id?.toString() === id.toString());
          if (found) {
            this.postalCode = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.postalCode.CityName && !this.cities.some(c => c.Name === this.postalCode.CityName)) {
              this.cities.push({ id: 0, Name: this.postalCode.CityName });
            }
            if (this.postalCode.DistrictName && !this.districts.some(d => d.Name === this.postalCode.DistrictName)) {
              this.districts.push({ id: 0, Name: this.postalCode.DistrictName });
            }
            if (this.postalCode.StateName && !this.states.some(s => s.Name === this.postalCode.StateName)) {
              this.states.push({ id: 0, Name: this.postalCode.StateName });
            }
            if (this.postalCode.CountryName && !this.countries.some(c => c.Name === this.postalCode.CountryName)) {
              this.countries.push({ id: 0, Name: this.postalCode.CountryName });
            }
            if (this.postalCode.BranchName && !this.branches.some(b => b.Name === this.postalCode.BranchName)) {
              this.branches.push({ id: 0, Name: this.postalCode.BranchName });
            }
            if (this.postalCode.DepartmentName && !this.departments.some(d => d.Name === this.postalCode.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.postalCode.DepartmentName });
            }
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating postal code data:', this.postalCode);
    this.router.navigate(['/misc/postalcode/postalcodelist']);
  }
}
