import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { BUILDING_LIST } from './hospitalbuilding-data';

@Component({
  selector: 'app-hospitalbuilding',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './hospitalbuilding.html',
})
export class HospitalBuilding implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  buildingList: any[] = BUILDING_LIST;

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor() {}

  ngOnInit() {
  }
  
  getFilteredBuildings() {
    let filtered = this.buildingList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.buildingList.filter(b => 
        (b.Name && b.Name.toLowerCase().includes(search)) ||
        (b.ShortName && b.ShortName.toLowerCase().includes(search)) ||
        (b.City && b.City.toLowerCase().includes(search)) ||
        (b.Email && b.Email.toLowerCase().includes(search)) ||
        (b.PhonePrimary && b.PhonePrimary.toLowerCase().includes(search))
      );
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
