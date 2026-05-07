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
  selector: 'app-unitadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './unitadd.html',
})
export class UnitAdd implements OnInit {
  unit: any = {
    Name: '',
    DisplayName: '',
    Description: '',
    BranchName: 'Main Branch',
    DepartmentName: 'Bio Chemistry',
    Status: 'Active'
  };

  departments: any[] = [];
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }
      }
    });
  }

  save() {
    console.log('Saving unit:', this.unit);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}