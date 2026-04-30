import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import diagTestData from '../../diagtestdata.json';
import diagTestGroupsData from '../../diagtestgroups.json';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diaggroupedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './diaggroupedit.html',
})
export class DiagGroupEdit implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  allTests: any[] = diagTestData;
  groupableTests: any[] = [];
  singleTests: any[] = [];
  selectedGroup: any = null;
  linkedTests: any[] = [];
  structureData: any[] = [];
  searchText: string = '';
  groupSearchText: string = '';

  linkedPage: number = 1;
  linkedItemsPerPage: number = 10;

  availablePage: number = 1;
  availableItemsPerPage: number = 10;

  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Filter tests into Groups (PRO, MUL, PKG) and Singles (SNG)
    this.groupableTests = this.allTests.filter(t => 
      t.Type === 'PRO' || t.Type === 'MUL' || t.Type === 'PKG'
    );
    this.singleTests = this.allTests.filter(t => t.Type === 'SNG');

    // Load group based on ID parameter
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        const group = this.groupableTests.find(g => g.id === id);
        if (group) {
          this.selectGroup(group);
        }
      } else if (this.groupableTests.length > 0) {
        // Fallback to the first group if no ID
        this.selectGroup(this.groupableTests[0]);
      }
    });
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    // Load actual linked tests from the new JSON data
    const linked = (diagTestGroupsData as any[]).filter(g => g.DiagGroupID === group.id);
    this.linkedTests = linked.map(l => {
      // Find the actual test in allTests to get the verified Type
      const actualTest = this.allTests.find(t => t.id === l.DiagTestID);
      return {
        id: l.DiagTestID,
        Name: l.DiagTestName,
        Type: actualTest?.Type || l.DiagTestType || 'SNG',
        Priority: l.ReportingPriority
      };
    });
    
    // Sort by priority
    this.linkedTests.sort((a, b) => a.Priority - b.Priority);
    
    // Load recursive structure for report
    this.refreshStructureReport();
  }

  refreshStructureReport() {
    if (this.selectedGroup) {
      this.structureData = this.getRecursiveStructure(this.selectedGroup.id);
    } else {
      this.structureData = [];
    }
  }

  getRecursiveStructure(groupId: number, depth: number = 0): any[] {
    // If we're looking for children of the group we're currently editing, 
    // use the local linkedTests array (which has the latest session changes).
    // Otherwise, fallback to the static JSON mapping.
    let directChildren: any[] = [];
    
    if (this.selectedGroup && groupId === this.selectedGroup.id) {
       directChildren = this.linkedTests.map(t => ({
         DiagTestID: t.id,
         DiagTestName: t.Name,
         DiagTestType: t.Type,
         ReportingPriority: t.Priority
       }));
    } else {
       directChildren = (diagTestGroupsData as any[]).filter(g => g.DiagGroupID === groupId);
    }

    let results: any[] = [];

    // Sort by reporting priority
    directChildren.sort((a, b) => (a.ReportingPriority || 0) - (b.ReportingPriority || 0));

    directChildren.forEach(child => {
      // For tests in linkedTests, Type is already verified.
      // For tests from diagTestGroupsData, we verification against allTests.
      const actualTest = this.allTests.find(t => t.id === (child.DiagTestID || child.id));
      const type = actualTest?.Type || child.DiagTestType || child.Type || 'SNG';
      
      const testInfo = {
        id: child.DiagTestID || child.id,
        Name: child.DiagTestName || child.Name,
        Type: type,
        depth: depth
      };
      results.push(testInfo);

      // Recursive call if it's a group type (PRO, MUL, PKG)
      if (['PRO', 'MUL', 'PKG'].includes(type.toUpperCase())) {
        const descendants = this.getRecursiveStructure(testInfo.id, depth + 1);
        results = results.concat(descendants);
      }
    });

    return results;
  }

  addTestToGroup(test: any) {
    if (!this.linkedTests.find(t => t.id === test.id)) {
      this.linkedTests.push({
        id: test.id,
        Name: test.Name,
        Type: test.Type || 'SNG',
        Priority: this.linkedTests.length + 1
      });
      // In a real app, we would save to DB and then refresh structure
      // For mock, we just refresh structure (though it won't show new one unless we update diagTestGroupsData)
      this.refreshStructureReport();
    }
  }

  removeTestFromGroup(testId: number) {
    this.linkedTests = this.linkedTests.filter(t => t.id !== testId);
    this.linkedTests.forEach((t, index) => t.Priority = index + 1);
    this.refreshStructureReport();
  }

  getFilteredAvailableTests() {
    // Get IDs of already linked tests
    const linkedIds = new Set(this.linkedTests.map(t => t.id));
    
    // Filter from allTests except the selected group and already linked ones
    const available = this.allTests.filter(t => 
      t.id !== this.selectedGroup?.id && !linkedIds.has(t.id)
    );

    if (!this.searchText.trim()) {
      return available;
    }
    const search = this.searchText.toLowerCase();
    return available.filter(t => 
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

  getPaginatedLinkedTests() {
    const startIndex = (this.linkedPage - 1) * this.linkedItemsPerPage;
    return this.linkedTests.slice(startIndex, startIndex + this.linkedItemsPerPage);
  }

  get totalLinkedPages() {
    return Math.ceil(this.linkedTests.length / this.linkedItemsPerPage);
  }

  getPaginatedAvailableTests() {
    const filtered = this.getFilteredAvailableTests();
    const startIndex = (this.availablePage - 1) * this.availableItemsPerPage;
    return filtered.slice(startIndex, startIndex + this.availableItemsPerPage);
  }

  get totalAvailablePages() {
    return Math.ceil(this.getFilteredAvailableTests().length / this.availableItemsPerPage);
  }
}