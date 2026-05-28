import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface WardBedType {
  id: string;
  BedNumber: string;
  Description: string;
  BranchName: string;
  DepartmentName: string;
  WardName: string;
  FloorID: string;
  FloorName: string;
  OccupancyStatus: string;
  [key: string]: any;
}

export const WARD_BED_DATA: WardBedType[] = [
    {
      "id": "WB001",
      "BedNumber": "BED-101",
      "Description": "General Bed",
      "BranchName": "Main Branch",
      "DepartmentName": "Clinical Pathology",
      "WardName": "General Ward - Male",
      "FloorID": "FLR001",
      "FloorName": "First Floor",
      "OccupancyStatus": "Allocated"
    },
    {
      "id": "WB002",
      "BedNumber": "BED-102",
      "Description": "ICU Bed with Ventilator",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "WardName": "ICU - A",
      "FloorID": "FLR002",
      "FloorName": "Second Floor",
      "OccupancyStatus": "Available"
    },
    {
      "id": "WB003",
      "BedNumber": "BED-103",
      "Description": "Pediatric Bed",
      "BranchName": "City Center Branch",
      "DepartmentName": "Microbiology",
      "WardName": "Pediatric Ward",
      "FloorID": "FLR003",
      "FloorName": "Third Floor",
      "OccupancyStatus": "Available"
    },
    {
      "id": "WB004",
      "BedNumber": "BED-401",
      "Description": "Cardiac ICU Bed",
      "BranchName": "Main Branch",
      "DepartmentName": "Cardiology",
      "WardName": "Cardiac Care Unit",
      "FloorID": "FLR006",
      "FloorName": "Fourth Floor",
      "OccupancyStatus": "Allocated"
    },
    {
      "id": "WB005",
      "BedNumber": "BED-501",
      "Description": "Premium Private Bed",
      "BranchName": "Main Branch",
      "DepartmentName": "Neurology",
      "WardName": "Neurology Ward",
      "FloorID": "FLR007",
      "FloorName": "Fifth Floor",
      "OccupancyStatus": "Available"
    },
    {
      "id": "WB006",
      "BedNumber": "BED-601",
      "Description": "Oncology Care Bed",
      "BranchName": "Main Branch",
      "DepartmentName": "Oncology",
      "WardName": "Oncology Unit",
      "FloorID": "FLR008",
      "FloorName": "Sixth Floor",
      "OccupancyStatus": "Allocated"
    },
    {
      "id": "WB007",
      "BedNumber": "BED-G01",
      "Description": "Physio Rehab Bed",
      "BranchName": "City Center Branch",
      "DepartmentName": "Physiotherapy",
      "WardName": "Rehab Center",
      "FloorID": "FLR009",
      "FloorName": "Ground Floor B",
      "OccupancyStatus": "Available"
    },
    {
      "id": "WB008",
      "BedNumber": "BED-105",
      "Description": "Female General Bed",
      "BranchName": "Main Branch",
      "DepartmentName": "Clinical Pathology",
      "WardName": "General Ward - Female",
      "FloorID": "FLR001",
      "FloorName": "First Floor",
      "OccupancyStatus": "Available"
    }
];

@Component({
  selector: 'app-ward-bed-list',
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
  templateUrl: './ward-bed-list.component.html',
  providers: [TableService]
})
export class WardBedListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  wardBeds$: Observable<WardBedType[]>;

  constructor(public tableService: TableService<WardBedType>) {
    this.wardBeds$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(WARD_BED_DATA, 10);
  }

  addWardBed() {
    this.router.navigate(['/master/hospital/ward-bed-new']);
  }

  editWardBed(id: string) {
    this.router.navigate(['/master/hospital/ward-bed-edit'], { queryParams: { id: id } });
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
