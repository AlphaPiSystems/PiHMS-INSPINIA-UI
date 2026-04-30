import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { WARD_LIST } from './ward-data';

@Component({
  selector: 'app-ward',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './ward.html',
})
export class Ward implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  wardList: any[] = WARD_LIST;

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }
  
  getFilteredWards() {
    let filtered = this.wardList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.wardList.filter(w => 
        (w.WardNumber && w.WardNumber.toLowerCase().includes(search)) ||
        (w.Name && w.Name.toLowerCase().includes(search)) ||
        (w.Description && w.Description.toLowerCase().includes(search)) ||
        (w.FloorName && w.FloorName.toLowerCase().includes(search)) ||
        (w.WardTypeID && w.WardTypeID.toLowerCase().includes(search)) ||
        (w.Department && w.Department.toLowerCase().includes(search)) ||
        (w.Status && w.Status.toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedWards() {
    const filtered = this.getFilteredWards();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredWards().length / this.itemsPerPage);
  }
}
