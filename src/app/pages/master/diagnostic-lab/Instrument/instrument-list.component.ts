import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface InstrumentType {
  id: number;
  InstrumentationName: string;
  BranchName: string;
  DepartmentName: string;
  CreatedStaffID: string;
  CreatedDateTime: string | null;
  UpdatedStaffID: string | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string;
  [key: string]: any;
}

const INSTRUMENT_DATA: InstrumentType[] = [
  { id: 1, InstrumentationName: 'Minividas', BranchName: 'Main Branch', DepartmentName: 'Bio Chemistry', CreatedStaffID: '1', CreatedDateTime: null, UpdatedStaffID: null, UpdatedDateTime: null, IsRowDeleted: 'N' },
  { id: 2, InstrumentationName: 'BioChemistry', BranchName: 'Main Branch', DepartmentName: 'Haematology', CreatedStaffID: '1', CreatedDateTime: null, UpdatedStaffID: null, UpdatedDateTime: null, IsRowDeleted: 'N' },
  { id: 3, InstrumentationName: 'Micro60', BranchName: 'Main Branch', DepartmentName: 'Microbiology', CreatedStaffID: '1', CreatedDateTime: null, UpdatedStaffID: null, UpdatedDateTime: null, IsRowDeleted: 'N' },
];

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NgIcon,
    AsyncPipe,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    NgbTooltipModule
  ],
  templateUrl: './instrument-list.component.html',
  providers: [TableService]
})
export class InstrumentListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  instruments$: Observable<InstrumentType[]>;

  constructor(public tableService: TableService<InstrumentType>) {
    this.instruments$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(INSTRUMENT_DATA, 10);
  }

  addInstrument() {
    this.router.navigate(['/master/diagnostic-lab/instrument-new']);
  }

  editInstrument(id: number) {
    this.router.navigate(['/master/diagnostic-lab/instrument-edit'], { queryParams: { id } });
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete selected items?')) {
      this.tableService.deleteSelectedItems();
    }
  }
}
