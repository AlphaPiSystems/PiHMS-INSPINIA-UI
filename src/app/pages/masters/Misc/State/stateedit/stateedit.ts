import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stateedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './stateedit.html',
})
export class StateEdit implements OnInit {
  state: any = {};
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.state) {
          const found = data.state.find((s: any) => s.id?.toString() === id.toString());
          if (found) {
            this.state = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.state.CountryName && !this.countries.some(c => c.Name === this.state.CountryName)) {
              this.countries.push({ id: 0, Name: this.state.CountryName });
            }
            if (this.state.BranchName && !this.branches.some(b => b.Name === this.state.BranchName)) {
              this.branches.push({ id: 0, Name: this.state.BranchName });
            }
            if (this.state.DepartmentName && !this.departments.some(d => d.Name === this.state.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.state.DepartmentName });
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
    console.log('Updating state data:', this.state);
    this.router.navigate(['/misc/state/statelist']);
  }
}
