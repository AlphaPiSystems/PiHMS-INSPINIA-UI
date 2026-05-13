import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HousekeepingTaskType } from '../../types';

@Component({
  selector: 'app-housekeeping',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './housekeeping.html',
})
export class Housekeeping implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  tasks: HousekeepingTaskType[] = [];
  departments: any[] = [];
  branches: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          this.tasks = data.housekeeping_tasks || [];
          this.departments = data.departments || [];
          this.branches = data.hospitalbuilding || [];
        }
      },
      error: (err) => {
        console.error('Error loading housekeeping tasks from JSON:', err);
      }
    });
  }

  getDepartmentName(id: number | null): string {
    if (!id) return '-';
    const dept = this.departments.find(d => d.id == id);
    return dept ? dept.Name : '-';
  }

  getBranchName(id: number | null): string {
    if (!id) return '-';
    const branch = this.branches.find(b => b.id == id);
    return branch ? branch.Name : '-';
  }

  getFilteredTasks() {
    let filtered = this.tasks;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.tasks.filter(i => {
        const deptName = this.getDepartmentName(i.DepartmentID).toLowerCase();
        const branchName = this.getBranchName(i.BranchID).toLowerCase();
        return (i.TaskName && i.TaskName.toLowerCase().includes(search)) ||
          (i.Descriptions && i.Descriptions.toLowerCase().includes(search)) ||
          (i.Category && i.Category.toLowerCase().includes(search)) ||
          deptName.includes(search) ||
          branchName.includes(search);
      });
    }
    return filtered;
  }

  getPaginatedTasks() {
    const filtered = this.getFilteredTasks();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
