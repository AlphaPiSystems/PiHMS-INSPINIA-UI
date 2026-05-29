import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface DepartmentType {
  id: number;
  Name: string;
  Description: string;
  BranchID: string | null;
  BranchName: string | null;
  DepartmentID: string | null;
  DepartmentName: string | null;
  CreatedStaffID: string | null;
  CreatedDateTime: string | null;
  UpdatedStaffID: string | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string | null;
  [key: string]: any;
}

export const DEPARTMENT_DATA: DepartmentType[] = [
    {
      "id": 1,
      "Name": "LABORATORY",
      "Description": "LABORATORY",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:04:33",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:04:33",
      "IsRowDeleted": "N"
    },
    {
      "id": 2,
      "Name": "PHARMARCY",
      "Description": "PHARMARCY",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "102",
      "DepartmentName": "Pharmacy Services",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:05:17",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:05:17",
      "IsRowDeleted": "N"
    },
    {
      "id": 3,
      "Name": "SECOND FLOOR",
      "Description": "SECOND FLOOR",
      "BranchID": "2",
      "BranchName": "North Branch",
      "DepartmentID": "103",
      "DepartmentName": "Inpatient",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:05:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:05:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 4,
      "Name": "THIRD FLOOR",
      "Description": "THIRD FLOOR",
      "BranchID": "2",
      "BranchName": "North Branch",
      "DepartmentID": "103",
      "DepartmentName": "Inpatient",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:06:02",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:06:02",
      "IsRowDeleted": "N"
    },
    {
      "id": 5,
      "Name": "ACCOUNTS",
      "Description": "ACCOUNTS",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "104",
      "DepartmentName": "Administration",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:06:23",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:06:23",
      "IsRowDeleted": "N"
    },
    {
      "id": 6,
      "Name": "BILLING\\INSURANCE",
      "Description": "BILLING\\INSURANCE",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "104",
      "DepartmentName": "Administration",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:06:50",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:06:50",
      "IsRowDeleted": "N"
    },
    {
      "id": 7,
      "Name": "SCANNING",
      "Description": "SCANNING",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:07:27",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:07:27",
      "IsRowDeleted": "N"
    },
    {
      "id": 8,
      "Name": "DIALYSIS",
      "Description": "DIALYSIS",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "105",
      "DepartmentName": "Specialty Care",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:08:32",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:08:32",
      "IsRowDeleted": "N"
    },
    {
      "id": 9,
      "Name": "ICU",
      "Description": "ICU",
      "BranchID": "2",
      "BranchName": "North Branch",
      "DepartmentID": "106",
      "DepartmentName": "Critical Care",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:08:49",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:08:49",
      "IsRowDeleted": "N"
    },
    {
      "id": 10,
      "Name": "OT",
      "Description": "OT",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "107",
      "DepartmentName": "Surgery",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:08:58",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:08:58",
      "IsRowDeleted": "N"
    },
    {
      "id": 11,
      "Name": "LABOUR",
      "Description": "LABOUR",
      "BranchID": "3",
      "BranchName": "South Branch",
      "DepartmentID": "108",
      "DepartmentName": "Maternity",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:09:20",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:09:20",
      "IsRowDeleted": "N"
    },
    {
      "id": 12,
      "Name": "HOUSE KEEPING",
      "Description": "HOUSE KEEPING",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "109",
      "DepartmentName": "Facility Services",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:10:23",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:10:23",
      "IsRowDeleted": "N"
    },
    {
      "id": 13,
      "Name": "ELE - MAINTAINCE",
      "Description": "ELE - MAINTAINCE",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "109",
      "DepartmentName": "Facility Services",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:10:38",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:10:38",
      "IsRowDeleted": "N"
    },
    {
      "id": 14,
      "Name": "X- RAY",
      "Description": "X- RAY",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:10:58",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:10:58",
      "IsRowDeleted": "N"
    },
    {
      "id": 18,
      "Name": "MRD",
      "Description": "MRD",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "110",
      "DepartmentName": "Records",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 19,
      "Name": "CASUALITY",
      "Description": "CASUALITY",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "111",
      "DepartmentName": "Emergency",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 20,
      "Name": "ULTRASOUND",
      "Description": "ULTRASOUND",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 21,
      "Name": "RADIOLOGY",
      "Description": "RADIOLOGY",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 22,
      "Name": "CSSD",
      "Description": "CSSD",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "112",
      "DepartmentName": "Sterilization",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 23,
      "Name": "OTHERS",
      "Description": "OTHERS",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "199",
      "DepartmentName": "Miscellaneous",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:46",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:46",
      "IsRowDeleted": "N"
    },
    {
      "id": 24,
      "Name": "RECEPTION",
      "Description": "RECEPTION",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "104",
      "DepartmentName": "Administration",
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2021-08-12 15:24:39",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2021-08-12 15:24:39",
      "IsRowDeleted": "N"
    },
    {
      "id": 25,
      "Name": "YMRC",
      "Description": "YMRC",
      "BranchID": "2",
      "BranchName": "North Branch",
      "DepartmentID": "120",
      "DepartmentName": "Research",
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-08-19 10:13:42",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-08-19 10:13:42",
      "IsRowDeleted": "N"
    },
    {
      "id": 26,
      "Name": "SWAB TUBE STERILE",
      "Description": "SWAB TUBE STERILE",
      "BranchID": "1",
      "BranchName": "Main Branch",
      "DepartmentID": "101",
      "DepartmentName": "Diagnostics",
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-09-08 16:27:55",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-09-08 16:27:55",
      "IsRowDeleted": "N"
    }
];

@Component({
  selector: 'app-department-list',
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
  templateUrl: './department-list.component.html',
  providers: [TableService]
})
export class DepartmentListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  departments$: Observable<DepartmentType[]>;

  constructor(public tableService: TableService<DepartmentType>) {
    this.departments$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(DEPARTMENT_DATA, 10);
  }

  addDepartment() {
    this.router.navigate(['/master/department/department-new']);
  }

  editDepartment(id: number) {
    this.router.navigate(['/master/department/department-edit'], { queryParams: { id: id } });
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete selected departments?')) {
      this.tableService.deleteSelectedItems();
    }
  }
}
