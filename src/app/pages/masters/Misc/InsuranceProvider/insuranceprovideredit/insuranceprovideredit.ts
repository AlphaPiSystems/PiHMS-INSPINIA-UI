import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insuranceprovideredit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './insuranceprovideredit.html',
})
export class InsuranceProviderEdit implements OnInit {
  provider: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.insuranceprovider) {
          const found = data.insuranceprovider.find((p: any) => p.id?.toString() === id.toString());
          if (found) {
            this.provider = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.provider.BranchName && !this.branches.some(b => b.Name === this.provider.BranchName)) {
              this.branches.push({ id: 0, Name: this.provider.BranchName });
            }
            if (this.provider.DepartmentName && !this.departments.some(d => d.Name === this.provider.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.provider.DepartmentName });
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
    console.log('Updating insurance provider data:', this.provider);
    this.router.navigate(['/misc/insuranceprovider/insuranceproviderlist']);
  }
}
