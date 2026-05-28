import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface WardType {
  id: string;
  WardNumber: string;
  Name: string;
  FloorName: string;
  WardTypeID: string;
  Department: string;
  Status: string;
  [key: string]: any;
}

export const WARD_DATA: WardType[] = [
    {
      "id": "WRD001",
      "WardNumber": "W-101",
      "Name": "General Ward - Male",
      "Description": "Male General Ward",
      "FloorID": "FLR001",
      "FloorName": "First Floor",
      "WardTypeID": "General",
      "PhoneNumber": "080-1234567",
      "ExtensionNumber": "101",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": 5,
      "Department": "Clinical Pathology",
      "Status": "Active"
    },
    {
      "id": "WRD002",
      "WardNumber": "W-201",
      "Name": "ICU - A",
      "Description": "Intensive Care Unit",
      "FloorID": "FLR002",
      "FloorName": "Second Floor",
      "WardTypeID": "ICU",
      "PhoneNumber": "080-2345678",
      "ExtensionNumber": "201",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": 3,
      "Department": "Bio Chemistry",
      "Status": "Active"
    },
    {
      "id": "WRD003",
      "WardNumber": "W-301",
      "Name": "Pediatric Ward",
      "Description": "Pediatric Care Unit",
      "FloorID": "FLR003",
      "FloorName": "Third Floor",
      "WardTypeID": "Pediatric",
      "PhoneNumber": "080-3456789",
      "ExtensionNumber": "301",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": 10,
      "Department": "Microbiology",
      "Status": "Inactive"
    },
    {
      "id": "WRD004",
      "WardNumber": "W-401",
      "Name": "Cardiac Care Unit",
      "Description": "Specialized Cardiology Ward",
      "FloorID": "FLR006",
      "FloorName": "Fourth Floor",
      "WardTypeID": "ICU",
      "PhoneNumber": "080-4567890",
      "ExtensionNumber": "401",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": 4,
      "Department": "Cardiology",
      "Status": "Active"
    },
    {
      "id": "WRD005",
      "WardNumber": "W-501",
      "Name": "Neurology Ward",
      "Description": "Brain and Nerve Care",
      "FloorID": "FLR007",
      "FloorName": "Fifth Floor",
      "WardTypeID": "Private",
      "PhoneNumber": "080-5678901",
      "ExtensionNumber": "501",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": 66,
      "Department": "Neurology",
      "Status": "Active"
    },
    {
      "id": "WRD006",
      "WardNumber": "W-601",
      "Name": "Oncology Unit",
      "Description": "Cancer Care Center",
      "FloorID": "FLR008",
      "FloorName": "Sixth Floor",
      "WardTypeID": "Semi-Private",
      "PhoneNumber": "080-6789012",
      "ExtensionNumber": "601",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": "DPT021",
      "Department": "Oncology",
      "Status": "Active"
    },
    {
      "id": "WRD007",
      "WardNumber": "W-G02",
      "Name": "Rehab Center",
      "Description": "Physiotherapy and Rehab",
      "FloorID": "FLR009",
      "FloorName": "Ground Floor B",
      "WardTypeID": "General",
      "PhoneNumber": "080-7890123",
      "ExtensionNumber": "701",
      "BranchID": 1,
      "BranchName": "City Center Branch",
      "DepartmentID": "DPT024",
      "Department": "Physiotherapy",
      "Status": "Active"
    },
    {
      "id": "WRD008",
      "WardNumber": "W-102",
      "Name": "General Ward - Female",
      "Description": "Female General Ward",
      "FloorID": "FLR001",
      "FloorName": "First Floor",
      "WardTypeID": "General",
      "PhoneNumber": "080-1234568",
      "ExtensionNumber": "102",
      "BranchID": 1,
      "BranchName": "Main Branch",
      "DepartmentID": "DPT004",
      "Department": "Clinical Pathology",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-ward-list',
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
  templateUrl: './ward-list.component.html',
  providers: [TableService]
})
export class WardListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  wards$: Observable<WardType[]>;

  constructor(public tableService: TableService<WardType>) {
    this.wards$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(WARD_DATA, 10);
  }

  addWard() {
    this.router.navigate(['/master/hospital/ward-new']);
  }

  editWard(id: string) {
    this.router.navigate(['/master/hospital/ward-edit'], { queryParams: { id: id } });
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
