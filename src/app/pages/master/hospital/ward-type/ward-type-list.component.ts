import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface WardTypeType {
  id: string;
  Type: string;
  Description: string;
  BranchName: string;
  DepartmentName: string;
  [key: string]: any;
}

export const WARD_TYPE_DATA: WardTypeType[] = [
    {
      "id": "WT001",
      "Type": "General",
      "Description": "General Ward",
      "BranchName": "Main Branch",
      "DepartmentName": "Clinical Pathology"
    },
    {
      "id": "WT002",
      "Type": "ICU",
      "Description": "Intensive Care Unit",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry"
    },
    {
      "id": "WT003",
      "Type": "Pediatric",
      "Description": "Pediatric Care Unit",
      "BranchName": "City Center Branch",
      "DepartmentName": "Microbiology"
    },
    {
      "id": "WT004",
      "Type": "Private",
      "Description": "Single Occupancy Room",
      "BranchName": "Main Branch",
      "DepartmentName": "Neurology"
    },
    {
      "id": "WT005",
      "Type": "Semi-Private",
      "Description": "Double Occupancy Room",
      "BranchName": "Main Branch",
      "DepartmentName": "Oncology"
    },
    {
      "id": "WT006",
      "Type": "Maternity",
      "Description": "Maternity and Labor Ward",
      "BranchName": "Main Branch",
      "DepartmentName": "Obstetrics and gynaecology"
    }
];

@Component({
  selector: 'app-ward-type-list',
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
  templateUrl: './ward-type-list.component.html',
  providers: [TableService]
})
export class WardTypeListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  wardTypes$: Observable<WardTypeType[]>;

  constructor(public tableService: TableService<WardTypeType>) {
    this.wardTypes$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(WARD_TYPE_DATA, 10);
  }

  addWardType() {
    this.router.navigate(['/master/hospital/ward-type-new']);
  }

  editWardType(id: string) {
    this.router.navigate(['/master/hospital/ward-type-edit'], { queryParams: { id: id } });
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
