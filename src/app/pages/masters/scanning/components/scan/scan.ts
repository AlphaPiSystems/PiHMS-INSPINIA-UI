import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ScanType } from '../../types';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './scan.html',
})
export class Scan implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  scans: ScanType[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.scan) {
          this.scans = data.scan;
        }
      },
      error: (err) => {
        console.error('Error loading scans from JSON:', err);
      }
    });
  }

  getFilteredScans() {
    let filtered = this.scans;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.scans.filter(i => 
        (i.Name && i.Name.toLowerCase().includes(search)) ||
        (i.Description && i.Description.toLowerCase().includes(search)) ||
        (i.Status && i.Status.toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedScans() {
    const filtered = this.getFilteredScans();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredScans().length / this.itemsPerPage);
  }
}
