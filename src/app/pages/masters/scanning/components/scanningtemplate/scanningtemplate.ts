import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ScanningTemplateType } from '../../types';

@Component({
  selector: 'app-scanningtemplate',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './scanningtemplate.html',
})
export class ScanningTemplate implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  scanningTemplates: ScanningTemplateType[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`assets/data/db.json?v=${new Date().getTime()}`).subscribe({
      next: (data) => {
        if (data && data.scanningtemplate) {
          this.scanningTemplates = data.scanningtemplate;
        }
      },
      error: (err) => {
        console.error('Error loading scanning templates from JSON:', err);
      }
    });
  }

  getFilteredItems() {
    let filtered = this.scanningTemplates;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.scanningTemplates.filter(i => {
        if (!i) return false;
        return Object.values(i).some(val => 
          val !== null && val !== undefined && 
          String(val).toLowerCase().includes(search)
        );
      });
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
