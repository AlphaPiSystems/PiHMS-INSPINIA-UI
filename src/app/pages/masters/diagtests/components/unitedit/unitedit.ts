import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unit-edit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './unitedit.html',
})
export class UnitEdit implements OnInit {
  unit: any = null;
  departments: any[] = [];
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }

        this.route.params.subscribe(params => {
          const id = +params['id'];
          if (id && data.unit) {
            this.unit = data.unit.find((u: any) => u.id === id);
            
            // Check if existing BranchName and DepartmentName are valid
            if (this.unit) {
              if (this.branches && !this.branches.some(b => b.Name === this.unit.BranchName)) {
                this.unit.BranchName = '';
              }
              if (this.departments && !this.departments.some(d => d.Name === this.unit.DepartmentName)) {
                this.unit.DepartmentName = '';
              }
            }
          }
        });
      }
    });
  }

  save(form: any) {
    if (form.invalid) {
      return;
    }
    console.log('Saving unit:', this.unit);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}