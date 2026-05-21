import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cityedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './cityedit.html',
})
export class CityEdit implements OnInit {
  city: any = {};
  districts: any[] = [];
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.districts = data.district || [];
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.city) {
          const found = data.city.find((c: any) => c.id?.toString() === id.toString());
          if (found) {
            this.city = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.city.DistrictName && !this.districts.some(d => d.Name === this.city.DistrictName)) {
              this.districts.push({ id: 0, Name: this.city.DistrictName });
            }
            if (this.city.StateName && !this.states.some(s => s.Name === this.city.StateName)) {
              this.states.push({ id: 0, Name: this.city.StateName });
            }
            if (this.city.CountryName && !this.countries.some(c => c.Name === this.city.CountryName)) {
              this.countries.push({ id: 0, Name: this.city.CountryName });
            }
            if (this.city.BranchName && !this.branches.some(b => b.Name === this.city.BranchName)) {
              this.branches.push({ id: 0, Name: this.city.BranchName });
            }
            if (this.city.DepartmentName && !this.departments.some(d => d.Name === this.city.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.city.DepartmentName });
            }
          }
        }
      }
    });
  }

  saveChanges(form?: any) {
    if (form && form.invalid) {
      return;
    }
    console.log('Updating city data:', this.city);
    this.router.navigate(['/misc/city/citylist']);
  }
}
