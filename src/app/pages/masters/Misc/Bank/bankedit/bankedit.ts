import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bankedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './bankedit.html',
})
export class BankEdit implements OnInit {
  bank: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.bank) {
          const found = data.bank.find((b: any) => b.id?.toString() === id.toString());
          if (found) {
            this.bank = { ...found };

            // Ensure database-loaded dropdown names exist in lists so they don't display as empty
            if (this.bank.BranchName && !this.branches.some(b => b.Name === this.bank.BranchName)) {
              this.branches.push({ id: 0, Name: this.bank.BranchName });
            }
            if (this.bank.DepartmentName && !this.departments.some(d => d.Name === this.bank.DepartmentName)) {
              this.departments.push({ id: 0, Name: this.bank.DepartmentName });
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
    console.log('Updating bank data:', this.bank);
    this.router.navigate(['/misc/bank/banklist']);
  }
}
