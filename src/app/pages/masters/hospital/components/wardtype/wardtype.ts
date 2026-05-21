import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wardtype',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './wardtype.html',
})
export class WardType implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  wardTypeList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{wardtype: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.wardtype) {
          this.wardTypeList = data.wardtype;
        }
      },
      error: (err) => {
        console.error('Error loading ward types from JSON:', err);
      }
    });
  }
  
  getFilteredWardTypes() {
    let filtered = this.wardTypeList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.wardTypeList.filter(wt => {
        if (!wt) return false;
        return Object.values(wt).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
    }
    return filtered;
  }

  getPaginatedWardTypes() {
    const filtered = this.getFilteredWardTypes();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredWardTypes().length / this.itemsPerPage);
  }
}
