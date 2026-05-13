import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ScanningItemType } from '../../types';

@Component({
  selector: 'app-scanningitem',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './scanningitem.html',
})
export class ScanningItem implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  scanningItems: ScanningItemType[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.scanningitem) {
          this.scanningItems = data.scanningitem;
        }
      },
      error: (err) => {
        console.error('Error loading scanning items from JSON:', err);
      }
    });
  }

  getFilteredItems() {
    let filtered = this.scanningItems;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.scanningItems.filter(i => 
        (i.Title && i.Title.toLowerCase().includes(search)) ||
        (i.ScanName && i.ScanName.toLowerCase().includes(search)) ||
        (i.Description && i.Description.toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedItems() {
    const filtered = this.getFilteredItems();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredItems().length / this.itemsPerPage);
  }
}
