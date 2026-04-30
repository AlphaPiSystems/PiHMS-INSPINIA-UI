import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import diagTestData from '../../diagtestdata.json';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diaggroup1',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './diaggroup1.html',
})
export class DiagGroup1 implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  allTests: any[] = diagTestData;
  groupableTests: any[] = [];
  singleTests: any[] = [];
  selectedGroup: any = null;
  linkedTests: any[] = [];
  searchText: string = '';
  groupSearchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Filter tests into Groups (PRO, MUL, PKG) and Singles (SNG)
    this.groupableTests = this.allTests.filter(t => 
      t.Type?.toUpperCase() === 'PRO' || 
      t.Type?.toUpperCase() === 'MUL' || 
      t.Type?.toUpperCase() === 'PKG'
    );
    this.singleTests = this.allTests.filter(t => t.Type?.toUpperCase() === 'SNG');

    // Default to the first group if it exists
    if (this.groupableTests.length > 0) {
      this.selectGroup(this.groupableTests[0]);
    }
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    // Mock linked tests for demonstration purposes
    this.linkedTests = this.singleTests.slice(0, 3).map((t, index) => ({
      ...t,
      Priority: index + 1
    }));
  }

  addTestToGroup(test: any) {
    if (!this.linkedTests.find(t => t.id === test.id)) {
      this.linkedTests.push({
        ...test,
        Priority: this.linkedTests.length + 1
      });
    }
  }

  removeTestFromGroup(testId: number) {
    this.linkedTests = this.linkedTests.filter(t => t.id !== testId);
    this.linkedTests.forEach((t, index) => t.Priority = index + 1);
  }

  getFilteredAvailableTests() {
    if (!this.searchText.trim()) {
      return this.singleTests;
    }
    const search = this.searchText.toLowerCase();
    return this.singleTests.filter(t => 
      t.Name.toLowerCase().includes(search) || 
      t.Code.toLowerCase().includes(search)
    );
  }

  getFilteredGroups() {
    let filtered = this.groupableTests;
    if (this.groupSearchText.trim()) {
      const search = this.groupSearchText.toLowerCase();
      filtered = this.groupableTests.filter(t => 
        t.Name.toLowerCase().includes(search) || 
        t.Code.toLowerCase().includes(search)
      );
    }
    return filtered;
  }

  getPaginatedGroups() {
    const filtered = this.getFilteredGroups();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredGroups().length / this.itemsPerPage);
  }

  get pages(): number[] {
    const total = this.totalPages;
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editGroup(group: any) {
    console.log('Edit group:', group);
  }

  deleteGroup(group: any) {
    console.log('Delete group:', group);
  }
}