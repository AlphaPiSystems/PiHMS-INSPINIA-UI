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
  selector: 'app-test-unit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './unit.html',
})
export class TestUnit implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  testUnits: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{unit: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.unit) {
          this.testUnits = data.unit;
        }
      },
      error: (err) => {
        console.error('Error loading units from JSON:', err);
      }
    });
  }

  getFilteredUnits() {
    let filtered = this.testUnits;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.testUnits.filter(u => 
        u.Name.toLowerCase().includes(search) ||
        u.DisplayName.toLowerCase().includes(search) ||
        u.Description.toLowerCase().includes(search) ||
        u.BranchName.toLowerCase().includes(search) ||
        u.DepartmentName.toLowerCase().includes(search)
      );
    }
    return filtered;
  }

  getPaginatedUnits() {
    const filtered = this.getFilteredUnits();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredUnits().length / this.itemsPerPage);
  }
}