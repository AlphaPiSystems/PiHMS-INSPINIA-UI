import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countryedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './countryedit.html',
})
export class CountryEdit implements OnInit {
  country: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.country) {
          const found = data.country.find((c: any) => c.id?.toString() === id.toString());
          if (found) {
            this.country = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.country.BranchName && !this.branches.some(b => b.Name === this.country.BranchName)) {
              this.branches.push({ id: 0, Name: this.country.BranchName });
            }
            if (this.country.DepartmentName && !this.departments.some(d => d.Name === this.country.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.country.DepartmentName });
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
    console.log('Updating country data:', this.country);
    this.router.navigate(['/misc/country/countrylist']);
  }
}
