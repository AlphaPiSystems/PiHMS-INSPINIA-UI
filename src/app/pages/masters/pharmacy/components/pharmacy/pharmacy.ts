import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { PharmacyType } from '../../types';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './pharmacy.html',
})
export class Pharmacy implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  pharmacyItems: PharmacyType[] = [];
  branches: any[] = [];
  departments: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.loadPharmacyItems();
  }

  loadPharmacyItems() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          this.pharmacyItems = data.pharmacy || [];
          this.branches = data.hospitalbuilding || [];
          this.departments = data.departments || [];
        }
      },
      error: (err) => {
        console.error('Error loading pharmacy items from JSON:', err);
      }
    });
  }

  getBranchName(id: any) {
    if (!id) return '-';
    const branch = this.branches.find(b => b.id === Number(id));
    return branch ? branch.Name : `Branch ${id}`;
  }

  getDepartmentName(id: any) {
    if (!id) return '-';
    const dept = this.departments.find(d => d.id === Number(id));
    return dept ? dept.Name : `Dept ${id}`;
  }
  
  getFilteredItems() {
    let filtered = this.pharmacyItems.filter(i => i.IsRowDeleted !== 'Y');
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(i => {
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
