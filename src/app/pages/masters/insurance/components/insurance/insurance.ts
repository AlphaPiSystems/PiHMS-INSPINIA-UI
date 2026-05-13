import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { InsuranceType } from '../../types';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './insurance.html',
})
export class Insurance implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  insuranceList: InsuranceType[] = [];
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
          this.insuranceList = data.insurance || [];
          this.departments = data.departments || [];
          this.branches = data.hospitalbuilding || [];
        }
      },
      error: (err) => {
        console.error('Error loading insurance data from JSON:', err);
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

  getFilteredInsurance() {
    let filtered = this.insuranceList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.insuranceList.filter(i => {
        const deptName = this.getDepartmentName(i.DepartmentID).toLowerCase();
        const branchName = this.getBranchName(i.BranchID).toLowerCase();
        return (i.Name && i.Name.toLowerCase().includes(search)) ||
          (i.Description && i.Description.toLowerCase().includes(search)) ||
          deptName.includes(search) ||
          branchName.includes(search);
      });
    }
    return filtered;
  }

  getPaginatedInsurance() {
    const filtered = this.getFilteredInsurance();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
