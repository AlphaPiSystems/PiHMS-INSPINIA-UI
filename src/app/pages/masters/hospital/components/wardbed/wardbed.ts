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
  selector: 'app-wardbed',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './wardbed.html',
})
export class WardBed implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  wardBedList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{wardbed: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.wardbed) {
          this.wardBedList = data.wardbed;
        }
      },
      error: (err) => {
        console.error('Error loading ward beds from JSON:', err);
      }
    });
  }
  
  getFilteredWardBeds() {
    let filtered = this.wardBedList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.wardBedList.filter(wb => {
        if (!wb) return false;
        return Object.values(wb).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
    }
    return filtered;
  }

  getPaginatedWardBeds() {
    const filtered = this.getFilteredWardBeds();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredWardBeds().length / this.itemsPerPage);
  }
}
