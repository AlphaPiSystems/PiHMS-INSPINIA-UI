import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { WARDBED_LIST } from './hospital-data';

@Component({
  selector: 'app-wardbed',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './wardbed.html',
})
export class WardBed implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  wardBedList: any[] = WARDBED_LIST;

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }
  
  getFilteredWardBeds() {
    let filtered = this.wardBedList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.wardBedList.filter(wb => 
        (wb.BedNumber && wb.BedNumber.toLowerCase().includes(search)) ||
        (wb.Description && wb.Description.toLowerCase().includes(search)) ||
        (wb.BranchName && wb.BranchName.toLowerCase().includes(search)) ||
        (wb.DepartmentName && wb.DepartmentName.toLowerCase().includes(search)) ||
        (wb.FloorName && wb.FloorName.toLowerCase().includes(search)) ||
        (wb.WardName && wb.WardName.toLowerCase().includes(search))
      );
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
