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
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './role.html',
})
export class Role implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  roleList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{staffRoles: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.staffRoles) {
          this.roleList = data.staffRoles.filter(r => r.IsRowDeleted !== 'Y');
        }
      },
      error: (err) => {
        console.error('Error loading roles from JSON:', err);
      }
    });
  }

  getFilteredRoles() {
    let filtered = this.roleList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.roleList.filter(s => 
        (s.RoleName && s.RoleName.toLowerCase().includes(search)) ||
        (s.RoleDescription && s.RoleDescription.toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedRoles() {
    const filtered = this.getFilteredRoles();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredRoles().length / this.itemsPerPage);
  }
}
