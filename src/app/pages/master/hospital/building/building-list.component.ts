import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface BuildingType {
  id: number;
  Name: string;
  ShortName: string;
  RegisteredName: string;
  ApplicationType: string;
  City: string;
  PhoneSecondary: string;
  [key: string]: any;
}

export const BUILDING_DATA: BuildingType[] = [
    {
      "id": 1,
      "Name": "City Center Multispecility Hospital",
      "ShortName": "CCM",
      "RegisteredName": "City Center Multispeciality Hospital",
      "ApplicationType": "PI - LIMS",
      "NameDisplayOption": null,
      "Address": "No.371, M.K.Puttalingaiah Road",
      "City": "Padmanabhanagar Bangalore-560070 ",
      "State": null,
      "Country": null,
      "PostalCode": null,
      "PhonePrimary": null,
      "PhoneSecondary": "080-42188108",
      "Email": "ccmh@gmail.com",
      "URL": null,
      "Logo": null,
      "LogoShort": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": null,
      "CreatedDateTime": null,
      "UpdatedStaffID": null,
      "UpdatedDateTime": null,
      "IsRowDeleted": "N"
    },
    {
      "id": 2,
      "Name": "Main Block",
      "ShortName": "MB",
      "RegisteredName": "Main Medical Block",
      "ApplicationType": "PI - LIMS",
      "NameDisplayOption": "Full Name",
      "Address": "123 Health Ave",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560001",
      "PhonePrimary": "+91 8012345678",
      "PhoneSecondary": "+91 8012345679",
      "Email": "info@mainblock.com",
      "URL": "www.mainblock.com"
    },
    {
      "id": 3,
      "Name": "Annex Building",
      "ShortName": "AB",
      "RegisteredName": "Annex Care Unit",
      "ApplicationType": "Clinic",
      "NameDisplayOption": "Short Name",
      "Address": "456 Wellness Rd",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560002",
      "PhonePrimary": "+91 8023456789",
      "PhoneSecondary": "",
      "Email": "contact@annexbuilding.com",
      "URL": "www.annexbuilding.com"
    },
    {
      "id": 4,
      "Name": "Diagnostic Center",
      "ShortName": "DC",
      "RegisteredName": "Global Diagnostic Center",
      "ApplicationType": "Lab",
      "NameDisplayOption": "Registered Name",
      "Address": "789 Lab Street",
      "City": "Mumbai",
      "State": "Maharashtra",
      "Country": "India",
      "PostalCode": "400001",
      "PhonePrimary": "+91 2234567890",
      "PhoneSecondary": "+91 2234567891",
      "Email": "admin@globaldiag.com",
      "URL": "www.globaldiag.com"
    }
];

@Component({
  selector: 'app-building-list',
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
  templateUrl: './building-list.component.html',
  providers: [TableService]
})
export class BuildingListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  buildings$: Observable<BuildingType[]>;

  constructor(public tableService: TableService<BuildingType>) {
    this.buildings$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(BUILDING_DATA, 10);
  }

  addBuilding() {
    this.router.navigate(['/master/hospital/building-new']);
  }

  editBuilding(id: number) {
    this.router.navigate(['/master/hospital/building-edit'], { queryParams: { id: id } });
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
