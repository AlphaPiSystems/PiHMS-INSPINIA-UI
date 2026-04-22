import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import diagTestData from '../../diagtestdata.json';

@Component({
  selector: 'app-diaggroup',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule],
  templateUrl: './diaggroup.html',
})
export class DiagGroup implements OnInit {
  allTests: any[] = diagTestData;
  groupableTests: any[] = [];
  singleTests: any[] = [];
  selectedGroup: any = null;
  linkedTests: any[] = [];
  searchText: string = '';
  groupSearchText: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Filter tests into Groups (PRO, MUL, PKG) and Singles (SNG)
    this.groupableTests = this.allTests.filter(t => 
      t.Type === 'PRO' || t.Type === 'MUL' || t.Type === 'PKG'
    );
    this.singleTests = this.allTests.filter(t => t.Type === 'SNG');

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
    if (!this.groupSearchText.trim()) {
      return this.groupableTests;
    }
    const search = this.groupSearchText.toLowerCase();
    return this.groupableTests.filter(t => 
      t.Name.toLowerCase().includes(search) || 
      t.Code.toLowerCase().includes(search)
    );
  }
}