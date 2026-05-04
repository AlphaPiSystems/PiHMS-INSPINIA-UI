import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { DEPARTMENT_LIST } from './department-data';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './department.html',
})
export class Department implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  departmentList: any[] = DEPARTMENT_LIST;

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }
  
  getFilteredDepartments() {
    let filtered = this.departmentList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.departmentList.filter(d => 
        (d.Name && d.Name.toLowerCase().includes(search)) ||
        (d.Description && d.Description.toLowerCase().includes(search)) ||
        (d.BranchName && d.BranchName.toLowerCase().includes(search)) ||
        (d.ParentDepartment && d.ParentDepartment.toLowerCase().includes(search)) ||
        (d.ReportPriority && d.ReportPriority.toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedDepartments() {
    const filtered = this.getFilteredDepartments();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredDepartments().length / this.itemsPerPage);
  }
}
// trigger recompile
