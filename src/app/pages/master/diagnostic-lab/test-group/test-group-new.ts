import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, LucideBox, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';
import { DIAG_GROUP_DATA, DIAG_TEST_DATA } from './test-group-list.component';

@Component({
  selector: 'app-test-group-new',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    NgIcon,
    AsyncPipe,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    NgbTooltipModule,
    FormsModule
  ],
  templateUrl: './test-group-new.html',
  providers: [TableService]
})
export class TestGroupNew implements OnInit {
  private router = inject(Router);
  private modalService = inject(NgbModal);

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideBox = LucideBox;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  testGroups$: Observable<any[]>;
  linkedTests: any[] = [];
  groupName: string = '';
  selectedParentGroup: any = null;
  availableGroupNames: any[] = [];
  availableTests: any[] = [];

  constructor(public tableService: TableService<any>) {
    this.testGroups$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    // Populate the dropdown with tests that can act as groups
    this.availableGroupNames = DIAG_TEST_DATA.filter(t => ['PRO', 'MUL', 'PKG'].includes(t.Type));

    // Get all tests of required types for Section 1 (available tests to add)
    this.availableTests = DIAG_TEST_DATA.filter(t => ['PRO', 'MUL', 'SNG', 'PKG'].includes(t.Type));
    this.tableService.setItems(this.availableTests, 8);
  }

  onGroupSelected() {
    if (this.selectedParentGroup) {
      this.groupName = this.selectedParentGroup.Name;
    }
  }

  addTest(id: number) {
    const testIndex = this.availableTests.findIndex(t => t.id === id);
    if (testIndex !== -1) {
      const test = this.availableTests[testIndex];
      // Add to Section 2
      this.linkedTests = [...this.linkedTests, {
        DiagTestID: test.id,
        DiagTestName: test.Name,
        DiagTestType: test.Type,
        Code: test.Code || '',
        ReportingPriority: 0,
        Notes: ''
      }];
      // Remove from Section 1
      this.availableTests = this.availableTests.filter(t => t.id !== id);
      this.tableService.setItems(this.availableTests, 8);
    }
  }

  removeTest(id: number) {
    const testIndex = this.linkedTests.findIndex(t => t.DiagTestID === id);
    if (testIndex !== -1) {
      const test = this.linkedTests[testIndex];
      // Remove from Section 2
      this.linkedTests = this.linkedTests.filter(t => t.DiagTestID !== id);

      // Add back to Section 1 if it matches type filtering criteria
      const originalTest = DIAG_TEST_DATA.find(t => t.id === id);
      if (originalTest && ['PRO', 'MUL', 'SNG', 'PKG'].includes(originalTest.Type)) {
        this.availableTests = [...this.availableTests, originalTest];
        this.tableService.setItems(this.availableTests, 8);
      }
    }
  }

  saveChanges() {
    if (!this.selectedParentGroup) {
      alert("Please select a Group Name.");
      return;
    }

    const newGroupId = this.selectedParentGroup.id;

    const newGroupEntries = this.linkedTests.map(test => {
      return {
        ID: Math.floor(Math.random() * 100000),
        DiagGroupID: newGroupId,
        DiagGroupName: this.groupName,
        DiagTestID: test.DiagTestID,
        DiagTestName: test.DiagTestName,
        DiagTestType: test.DiagTestType,
        ReportingPriority: Number(test.ReportingPriority) || 0,
        Notes: test.Notes || '',
        BranchID: 1,
        DepartmentID: 10,
        IsRowDeleted: 'N'
      };
    });

    DIAG_GROUP_DATA.push(...newGroupEntries);

    this.router.navigate(['/master/diagnostic-lab/test-group-list']);
  }

  cancel() {
    this.router.navigate(['/master/diagnostic-lab/test-group-list']);
  }

  openPreviewModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  getTestUnit(testId: number): string {
    const test = DIAG_TEST_DATA.find(t => t.id === testId);
    return test?.UnitName || test?.Units || '--';
  }

  getTestReferenceRange(testId: number): string {
    const test = DIAG_TEST_DATA.find(t => t.id === testId);
    return test?.Notes || 'Normal';
  }

  get sortedLinkedTests(): any[] {
    return [...this.linkedTests].sort((a, b) => {
      const priorityA = Number(a.ReportingPriority) || 0;
      const priorityB = Number(b.ReportingPriority) || 0;
      return priorityA - priorityB;
    });
  }

  isSubGroup(type: string): boolean {
    return ['PRO', 'MUL', 'PKG'].includes(type);
  }

  getSubTests(testId: number): any[] {
    const subTests = DIAG_GROUP_DATA
      .filter(g => g.DiagGroupID === testId)
      .map(g => {
        const testDetail = DIAG_TEST_DATA.find(t => t.id === g.DiagTestID);
        return {
          DiagTestID: g.DiagTestID,
          DiagTestName: g.DiagTestName,
          DiagTestType: g.DiagTestType,
          Code: testDetail?.Code || '',
          ReportingPriority: g.ReportingPriority,
          Notes: g.Notes
        };
      });
    return subTests.sort((a, b) => (Number(a.ReportingPriority) || 0) - (Number(b.ReportingPriority) || 0));
  }
}
