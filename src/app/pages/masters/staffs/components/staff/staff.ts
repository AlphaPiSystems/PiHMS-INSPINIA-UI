import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { STAFF_LIST } from './staff-data';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './staff.html',
})
export class Staff implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  staffList: any[] = STAFF_LIST;

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }

  getFilteredStaff() {
    let filtered = this.staffList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.staffList.filter(s => 
        s.Name.toLowerCase().includes(search) ||
        s.Designation.toLowerCase().includes(search) ||
        s.Department.toLowerCase().includes(search)
      );
    }
    return filtered;
  }

  getPaginatedStaff() {
    const filtered = this.getFilteredStaff();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredStaff().length / this.itemsPerPage);
  }
}