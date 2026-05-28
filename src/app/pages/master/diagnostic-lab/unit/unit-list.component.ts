import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucideBox, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface UnitType {
  id: number;
  Name: string;
  FullName: string;
  DisplayName: string;
  Description: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

const UNIT_DATA: UnitType[] = [
  { "id": 1, "Name": "mg/dL", "FullName": "Milligrams per Deciliter", "DisplayName": "mg/dL", "Description": "Concentration of mass in deciliters", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 2, "Name": "mmol/L", "FullName": "Millimoles per Liter", "DisplayName": "mmol/L", "Description": "Molar concentration in liters", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 3, "Name": "g/dL", "FullName": "Grams per Deciliter", "DisplayName": "g/dL", "Description": "Mass concentration in deciliters", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 4, "Name": "U/L", "FullName": "Units per Liter", "DisplayName": "U/L", "Description": "Enzyme activity concentration", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 5, "Name": "cells/mcL", "FullName": "Cells per Microliter", "DisplayName": "cells/mcL", "Description": "Cell count per microliter", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 6, "Name": "ratio", "FullName": "Ratio", "DisplayName": "ratio", "Description": "Calculated ratio between values", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 7, "Name": "%", "FullName": "Percentage", "DisplayName": "%", "Description": "Proportional percentage", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 8, "Name": "pg", "FullName": "Picograms", "DisplayName": "pg", "Description": "Mass in picograms", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 9, "Name": "fL", "FullName": "Femtoliters", "DisplayName": "fL", "Description": "Volume in femtoliters", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 10, "Name": "mIU/L", "FullName": "Milli-international Units per Liter", "DisplayName": "mIU/L", "Description": "Biological activity concentration", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 11, "Name": "ng/mL", "FullName": "Nanograms per Milliliter", "DisplayName": "ng/mL", "Description": "Mass concentration in milliliters", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 12, "Name": "mcg/dL", "FullName": "Micrograms per Deciliter", "DisplayName": "mcg/dL", "Description": "Mass concentration in deciliters", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 13, "Name": "sec", "FullName": "Seconds", "DisplayName": "sec", "Description": "Time in seconds", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 14, "Name": "min", "FullName": "Minutes", "DisplayName": "min", "Description": "Time in minutes", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 15, "Name": "mm/hr", "FullName": "Millimeters per Hour", "DisplayName": "mm/hr", "Description": "Sedimentation rate", "BranchName": "Main Branch", "DepartmentName": "Haematology", "Status": "Active" },
  { "id": 16, "Name": "mEq/L", "FullName": "Milliequivalents per Liter", "DisplayName": "mEq/L", "Description": "Electrolyte concentration", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 17, "Name": "g/24h", "FullName": "Grams per 24 Hours", "DisplayName": "g/24h", "Description": "24-hour excretion rate in grams", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" },
  { "id": 18, "Name": "mg/24h", "FullName": "Milligrams per 24 Hours", "DisplayName": "mg/24h", "Description": "24-hour excretion rate in milligrams", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry", "Status": "Active" }
];

@Component({
  selector: 'app-unit-list',
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
  templateUrl: './unit-list.component.html',
  providers: [TableService]
})
export class UnitListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideBox = LucideBox;
  protected readonly LucidePlus = LucidePlus;

  departmentFilter = 'all';
  total$: Observable<number>;
  units$: Observable<UnitType[]>;

  constructor(public tableService: TableService<UnitType>) {
    this.units$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(UNIT_DATA, 10);
  }

  applyDepartmentFilter() {
    this.tableService.setFilter('DepartmentName', this.departmentFilter === 'all' ? '' : this.departmentFilter);
  }

  addUnit() {
    this.router.navigate(['/master/diagnostic-lab/unit-new']);
  }

  editUnit(id: number) {
    this.router.navigate(['/master/diagnostic-lab/unit-edit'], { queryParams: { id: id } });
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
