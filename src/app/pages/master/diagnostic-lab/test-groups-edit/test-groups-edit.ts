import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, LucideBox, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';
import { DIAG_GROUP_DATA, DIAG_TEST_DATA } from '../test-groups/test-groups.component';

@Component({
  selector: 'app-test-groups-edit',
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
  templateUrl: './test-groups-edit.html',
  providers: [TableService]
})
export class TestGroupsEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modalService = inject(NgbModal);
  
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideBox = LucideBox;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  testGroups$: Observable<any[]>;
  linkedTests: any[] = [];
  groupName: string = '';
  availableTests: any[] = [];
  groupId!: number;

  constructor(public tableService: TableService<any>) {
    this.testGroups$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      const groupId = this.groupId;

      // Get group name from the first matching DIAG_GROUP_DATA entry
      const groupEntry = DIAG_GROUP_DATA.find(g => g.DiagGroupID === groupId);
      this.groupName = groupEntry?.DiagGroupName || `Group ${groupId}`;
      
      // Get tests already linked under this DiagGroupID for Section 2
      this.linkedTests = DIAG_GROUP_DATA
        .filter(g => g.DiagGroupID === groupId)
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

      // Get all tests of required types for Section 1 (available tests to add), excluding already linked ones
      const linkedIds = this.linkedTests.map(t => t.DiagTestID);
      this.availableTests = DIAG_TEST_DATA.filter(t => ['PRO', 'MUL', 'SNG', 'PKG'].includes(t.Type) && !linkedIds.includes(t.id));
      this.tableService.setItems(this.availableTests, 10);
    });
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
      this.tableService.setItems(this.availableTests, 10);
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
        this.tableService.setItems(this.availableTests, 10);
      }
    }
  }

  saveChanges() {
    const existingEntriesForGroup = DIAG_GROUP_DATA.filter(g => g.DiagGroupID === this.groupId);
    const templateEntry = existingEntriesForGroup[0] || {
      DiagGroupName: this.groupName,
      BranchID: 1,
      DepartmentID: 10,
      IsRowDeleted: 'N'
    };

    const updatedGroupEntries = this.linkedTests.map(test => {
      const matched = existingEntriesForGroup.find(e => e.DiagTestID === test.DiagTestID);
      if (matched) {
        return {
          ...matched,
          ReportingPriority: Number(test.ReportingPriority) || 0,
          Notes: test.Notes || ''
        };
      } else {
        return {
          ID: Math.floor(Math.random() * 100000),
          DiagGroupID: this.groupId,
          DiagGroupName: templateEntry.DiagGroupName,
          DiagTestID: test.DiagTestID,
          DiagTestName: test.DiagTestName,
          DiagTestType: test.DiagTestType,
          ReportingPriority: Number(test.ReportingPriority) || 0,
          Notes: test.Notes || '',
          BranchID: templateEntry.BranchID,
          DepartmentID: templateEntry.DepartmentID,
          IsRowDeleted: 'N'
        };
      }
    });

    // Mutate DIAG_GROUP_DATA in-place to clear existing entries for the group and insert new ones
    for (let i = DIAG_GROUP_DATA.length - 1; i >= 0; i--) {
      if (DIAG_GROUP_DATA[i].DiagGroupID === this.groupId) {
        DIAG_GROUP_DATA.splice(i, 1);
      }
    }
    DIAG_GROUP_DATA.push(...updatedGroupEntries);

    this.router.navigate(['/master/diagnostic-lab/test-groups-list']);
  }

  cancel() {
    this.router.navigate(['/master/diagnostic-lab/test-groups-list']);
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
