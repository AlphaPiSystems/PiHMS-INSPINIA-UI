import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { SurgeryType } from '../../types';

@Component({
  selector: 'app-surgery',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './surgery.html',
})
export class Surgery implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  surgeries: SurgeryType[] = [];
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
          this.surgeries = data.surgery || [];
          this.departments = data.departments || [];
          this.branches = data.hospitalbuilding || [];
        }
      },
      error: (err) => {
        console.error('Error loading surgeries from JSON:', err);
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

  getFilteredSurgeries() {
    let filtered = this.surgeries;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.surgeries.filter(i => {
        if (!i) return false;
        return Object.values(i).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
    }
    return filtered;
  }

  getPaginatedSurgeries() {
    const filtered = this.getFilteredSurgeries();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
