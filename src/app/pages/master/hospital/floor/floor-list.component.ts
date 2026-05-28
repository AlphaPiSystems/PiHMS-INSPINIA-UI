import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface FloorType {
  id: string;
  FloorNumber: string;
  FloorName: string;
  HospitalBuildingName: string;
  Accessibility: string;
  FrontDeskPresent: string;
  BranchName: string;
  Department: string;
  [key: string]: any;
}

export const FLOOR_DATA: FloorType[] = [
  {
    "id": "FLR001",
    "FloorNumber": "F01",
    "FloorName": "First Floor",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Wheelchair Accessible",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "101",
    "FrontDeskStaffName": "Meera Iyer",
    "BranchName": "Main Branch",
    "Department": "Clinical Pathology",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR002",
    "FloorNumber": "F02",
    "FloorName": "Second Floor",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Standard",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "201",
    "FrontDeskStaffName": "Deepa Menon",
    "BranchName": "Main Branch",
    "Department": "Bio Chemistry",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR003",
    "FloorNumber": "F03",
    "FloorName": "Third Floor",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Restricted",
    "FrontDeskPresent": "N",
    "FrontDeskNumber": "",
    "FrontDeskStaffName": "",
    "BranchName": "Main Branch",
    "Department": "Microbiology",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR004",
    "FloorNumber": "G01",
    "FloorName": "Ground Floor",
    "HospitalBuildingName": "Annex Building",
    "Accessibility": "Full Access",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "G01",
    "FrontDeskStaffName": "Sunita Reddy",
    "BranchName": "City Center Branch",
    "Department": "Radiology",
    "HospitalBuildingID": 3,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR005",
    "FloorNumber": "B01",
    "FloorName": "Basement",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Ramp Access",
    "FrontDeskPresent": "N",
    "FrontDeskNumber": "",
    "FrontDeskStaffName": "",
    "BranchName": "Main Branch",
    "Department": "Maintenance",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR006",
    "FloorNumber": "F04",
    "FloorName": "Fourth Floor",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Standard",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "401",
    "FrontDeskStaffName": "Anjali Sharma",
    "BranchName": "Main Branch",
    "Department": "Cardiology",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR007",
    "FloorNumber": "F05",
    "FloorName": "Fifth Floor",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Standard",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "501",
    "FrontDeskStaffName": "Rahul Verma",
    "BranchName": "Main Branch",
    "Department": "Neurology",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR008",
    "FloorNumber": "F06",
    "FloorName": "Sixth Floor",
    "HospitalBuildingName": "Specialty Wing",
    "Accessibility": "Restricted",
    "FrontDeskPresent": "N",
    "FrontDeskNumber": "",
    "FrontDeskStaffName": "",
    "BranchName": "Main Branch",
    "Department": "Oncology",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR009",
    "FloorNumber": "G02",
    "FloorName": "Ground Floor B",
    "HospitalBuildingName": "Annex Building",
    "Accessibility": "Full Access",
    "FrontDeskPresent": "Y",
    "FrontDeskNumber": "G02",
    "FrontDeskStaffName": "Priya Das",
    "BranchName": "City Center Branch",
    "Department": "Physiotherapy",
    "HospitalBuildingID": 3,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  },
  {
    "id": "FLR010",
    "FloorNumber": "B02",
    "FloorName": "Lower Basement",
    "HospitalBuildingName": "Main Block",
    "Accessibility": "Staff Only",
    "FrontDeskPresent": "N",
    "FrontDeskNumber": "",
    "FrontDeskStaffName": "",
    "BranchName": "Main Branch",
    "Department": "Housekeeping",
    "HospitalBuildingID": 2,
    "FrontDeskStaffID": null,
    "BranchID": 1,
    "DepartmentID": 1,
    "CreatedStaffID": null,
    "CreatedDateTime": null,
    "UpdatedStaffID": null,
    "UpdatedDateTime": null,
    "IsRowDeleted": "N"
  }
];

@Component({
  selector: 'app-floor-list',
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
  templateUrl: './floor-list.component.html',
  providers: [TableService]
})
export class FloorListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  floors$: Observable<FloorType[]>;

  constructor(public tableService: TableService<FloorType>) {
    this.floors$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(FLOOR_DATA, 10);
  }

  addFloor() {
    this.router.navigate(['/master/hospital/floor-new']);
  }

  editFloor(id: string) {
    this.router.navigate(['/master/hospital/floor-edit'], { queryParams: { id: id } });
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
