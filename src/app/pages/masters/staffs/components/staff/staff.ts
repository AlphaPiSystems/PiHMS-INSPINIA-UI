import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './staff.html',
})
export class Staff implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  staffList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{staff: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.staff) {
          this.staffList = data.staff;
        }
      },
      error: (err) => {
        console.error('Error loading staff from JSON:', err);
      }
    });
  }

  getFilteredStaff() {
    let filtered = this.staffList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.staffList.filter(s => {
        if (!s) return false;
        return Object.values(s).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
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