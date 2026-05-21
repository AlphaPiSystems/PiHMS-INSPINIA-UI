import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-districtedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './districtedit.html',
})
export class DistrictEdit implements OnInit {
  district: any = {};
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.district) {
          const found = data.district.find((d: any) => d.id?.toString() === id.toString());
          if (found) {
            this.district = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.district.StateName && !this.states.some(s => s.Name === this.district.StateName)) {
              this.states.push({ id: 0, Name: this.district.StateName });
            }
            if (this.district.CountryName && !this.countries.some(c => c.Name === this.district.CountryName)) {
              this.countries.push({ id: 0, Name: this.district.CountryName });
            }
            if (this.district.BranchName && !this.branches.some(b => b.Name === this.district.BranchName)) {
              this.branches.push({ id: 0, Name: this.district.BranchName });
            }
            if (this.district.DepartmentName && !this.departments.some(d => d.Name === this.district.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.district.DepartmentName });
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
    console.log('Updating district data:', this.district);
    this.router.navigate(['/misc/district/districtlist']);
  }
}
