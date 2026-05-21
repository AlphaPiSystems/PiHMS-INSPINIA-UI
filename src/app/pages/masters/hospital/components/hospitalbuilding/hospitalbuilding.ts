import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospitalbuilding',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './hospitalbuilding.html',
})
export class HospitalBuilding implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  buildingList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{hospitalbuilding: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.hospitalbuilding) {
          this.buildingList = data.hospitalbuilding;
        }
      },
      error: (err) => {
        console.error('Error loading hospital buildings from JSON:', err);
      }
    });
  }
  
  getFilteredBuildings() {
    let filtered = this.buildingList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.buildingList.filter(b => {
        if (!b) return false;
        return Object.values(b).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
    }
    return filtered;
  }

  getPaginatedBuildings() {
    const filtered = this.getFilteredBuildings();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredBuildings().length / this.itemsPerPage);
  }
}
