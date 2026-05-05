import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentService } from '../../../../../core/services/department.service';
import { Department as DepartmentType } from '../../../../../types/department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './department.html',
})
export class Department implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  departmentList: DepartmentType[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departmentList = data;
      },
      error: (err) => {
        console.error('Error loading departments:', err);
      }
    });
  }
  
  getFilteredDepartments() {
    let filtered = this.departmentList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.departmentList.filter(d => 
        (d.Name && d.Name.toLowerCase().includes(search)) ||
        (d.Description && d.Description.toLowerCase().includes(search)) ||
        (d.BranchID && d.BranchID.toString().toLowerCase().includes(search)) ||
        (d.ReportPriority && d.ReportPriority.toString().toLowerCase().includes(search)) ||
        (d.IsRowDeleted === 'N' ? 'active' : 'inactive').includes(search)
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
