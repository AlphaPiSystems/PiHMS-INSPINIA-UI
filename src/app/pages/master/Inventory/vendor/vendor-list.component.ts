import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface VendorType {
  id: number;
  Name: string;
  VendorCode: string | null;
  Address: string;
  City: string;
  State: string;
  Country: string;
  PostalCode: string;
  ContactPersonName: string;
  ContactPersonPhone: string;
  Notes: string | null;
  BranchID: string | null;
  DepartmentID: string | null;
  CreatedStaffID: string | null;
  CreatedDateTime: string | null;
  UpdatedStaffID: string | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string | null;
  [key: string]: any;
}

export const VENDOR_DATA: VendorType[] = [
    {
      "id": 1,
      "Name": "STORE",
      "VendorCode": null,
      "Address": "101 Main Bazar Road",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560001",
      "ContactPersonName": "Amit Sharma",
      "ContactPersonPhone": "+91 9845012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:11:58",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:11:58",
      "IsRowDeleted": null
    },
    {
      "id": 2,
      "Name": "MITRA DISTRIBUTOR",
      "VendorCode": null,
      "Address": "45 Mitra Avenue, Rajajinagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560010",
      "ContactPersonName": "Rakesh Mitra",
      "ContactPersonPhone": "+91 9886012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:12:44",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:12:44",
      "IsRowDeleted": null
    },
    {
      "id": 3,
      "Name": "SANDOOR MEDICAIDS",
      "VendorCode": null,
      "Address": "78 Sandoor Plaza, Malleshwaram",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560003",
      "ContactPersonName": "Sandeep Hegde",
      "ContactPersonPhone": "+91 9900012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:00",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:00",
      "IsRowDeleted": null
    },
    {
      "id": 4,
      "Name": "REVA DISTRIBUTOR",
      "VendorCode": null,
      "Address": "12 Reva Lane, Jayanagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560041",
      "ContactPersonName": "Ananya Rao",
      "ContactPersonPhone": "+91 9945012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:12",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:12",
      "IsRowDeleted": null
    },
    {
      "id": 5,
      "Name": "SRI VINAYAKA DISTRIBUTOR",
      "VendorCode": null,
      "Address": "55 Vinayaka Layout, Vijayanagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560040",
      "ContactPersonName": "Vinayak Prasad",
      "ContactPersonPhone": "+91 9844012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 15:13:33",
      "UpdatedStaffID": "1983",
      "UpdatedDateTime": "2020-09-23 15:13:33",
      "IsRowDeleted": null
    },
    {
      "id": 6,
      "Name": "ABHAY TECHNOLOGIES",
      "VendorCode": null,
      "Address": "88 Abhay Tech Park, Electronic City",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560100",
      "ContactPersonName": "Abhay Kumar",
      "ContactPersonPhone": "+91 9980012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2093",
      "CreatedDateTime": "2021-08-12 15:30:10",
      "UpdatedStaffID": "2093",
      "UpdatedDateTime": "2021-08-12 15:30:10",
      "IsRowDeleted": null
    },
    {
      "id": 8,
      "Name": "HYGIENE OFFICE SOLLUTIONS",
      "VendorCode": null,
      "Address": "34 Hygiene Complex, Whitefield",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560066",
      "ContactPersonName": "Himesh Patel",
      "ContactPersonPhone": "+91 9448012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-08-17 12:41:39",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-08-17 12:41:39",
      "IsRowDeleted": null
    },
    {
      "id": 9,
      "Name": "SAPTHAGIRI MEDICAL SYSTEMS",
      "VendorCode": null,
      "Address": "67 Sapthagiri Hills Road, Yeshwanthpur",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560022",
      "ContactPersonName": "Girish Gowda",
      "ContactPersonPhone": "+91 9880012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-08-19 11:24:31",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-08-19 11:24:31",
      "IsRowDeleted": null
    },
    {
      "id": 10,
      "Name": "S R ENTERPRISES",
      "VendorCode": null,
      "Address": "21 SR Industrial Area, Peenya",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560058",
      "ContactPersonName": "Srinivas Murthy",
      "ContactPersonPhone": "+91 9611012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2178",
      "CreatedDateTime": "2021-08-20 10:44:42",
      "UpdatedStaffID": "2178",
      "UpdatedDateTime": "2021-08-20 10:44:42",
      "IsRowDeleted": null
    },
    {
      "id": 11,
      "Name": "CHITRA GROUP",
      "VendorCode": null,
      "Address": "10 Chitra Enclave, Koramangala",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560034",
      "ContactPersonName": "Chitra Kulkarni",
      "ContactPersonPhone": "+91 9901012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-08-27 11:36:45",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-08-27 11:36:45",
      "IsRowDeleted": null
    },
    {
      "id": 12,
      "Name": "TOTAL CLEANING SYSTEMS",
      "VendorCode": null,
      "Address": "9 Total Hub, Indiranagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560038",
      "ContactPersonName": "Vikram Sen",
      "ContactPersonPhone": "+91 9741012345",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-08-27 11:45:31",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-08-27 11:45:31",
      "IsRowDeleted": null
    },
    {
      "id": 13,
      "Name": "SHOBHA STATIONERY & TELECOM",
      "VendorCode": null,
      "Address": "3 Shobha Complex, Sadashivanagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560080",
      "ContactPersonName": "Shobha Rani",
      "ContactPersonPhone": "+91 9845098765",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2178",
      "CreatedDateTime": "2021-09-03 09:49:46",
      "UpdatedStaffID": "2178",
      "UpdatedDateTime": "2021-09-03 09:49:46",
      "IsRowDeleted": null
    },
    {
      "id": 14,
      "Name": "OKTO HEALTHCARE & SERVICES LLP",
      "VendorCode": null,
      "Address": "50 Okto Towers, HSR Layout",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560102",
      "ContactPersonName": "Dr. Tarun Okto",
      "ContactPersonPhone": "+91 9945098765",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-09-04 14:23:29",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-09-04 14:23:29",
      "IsRowDeleted": null
    },
    {
      "id": 15,
      "Name": "NEWGEN SALES CORPORATION",
      "VendorCode": null,
      "Address": "14 Newgen Square, Bannerghatta Road",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560076",
      "ContactPersonName": "Naveen Chandra",
      "ContactPersonPhone": "+91 9886098765",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-09-06 12:30:11",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-09-06 12:30:11",
      "IsRowDeleted": null
    },
    {
      "id": 16,
      "Name": "SAMRUDDHI PRINT SOLUTIONS",
      "VendorCode": null,
      "Address": "28 Samruddhi Heights, Basaveshwaranagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560079",
      "ContactPersonName": "Sanjay Samruddhi",
      "ContactPersonPhone": "+91 9900098765",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-09-20 15:14:34",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-09-20 15:14:34",
      "IsRowDeleted": null
    },
    {
      "id": 17,
      "Name": "SHOBHA STATIONERY AND TELECOM",
      "VendorCode": null,
      "Address": "3 Shobha Complex, Sadashivanagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560080",
      "ContactPersonName": "Shobha Rani",
      "ContactPersonPhone": "+91 9845098765",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-09-29 16:37:23",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-09-29 16:37:23",
      "IsRowDeleted": null
    },
    {
      "id": 18,
      "Name": "GIGI'S WORLD",
      "VendorCode": null,
      "Address": "8 Gigi Street, Commercial Street",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560001",
      "ContactPersonName": "Gisela D'Souza",
      "ContactPersonPhone": "+91 9945054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-10-16 14:49:57",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-10-16 14:49:57",
      "IsRowDeleted": null
    },
    {
      "id": 19,
      "Name": "SHREE CHANDRASHEKHAR ENTERPRISES",
      "VendorCode": null,
      "Address": "99 Chandrashekhar Villa, Banashankari",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560085",
      "ContactPersonName": "Chandrashekhar S.",
      "ContactPersonPhone": "+91 9844054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-11-08 13:22:13",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-11-08 13:22:13",
      "IsRowDeleted": null
    },
    {
      "id": 20,
      "Name": "VIJAYALAKSHMI COMPUTERS",
      "VendorCode": null,
      "Address": "42 Lakshmi Nivas, RT Nagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560032",
      "ContactPersonName": "Vijay Lakshmi",
      "ContactPersonPhone": "+91 9980054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2021-12-20 17:21:04",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2021-12-20 17:21:04",
      "IsRowDeleted": null
    },
    {
      "id": 21,
      "Name": "SHREE CHANDRASHEKHAR ENTERPRISES",
      "VendorCode": null,
      "Address": "99 Chandrashekhar Villa, Banashankari",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560085",
      "ContactPersonName": "Chandrashekhar S.",
      "ContactPersonPhone": "+91 9844054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2022-01-15 15:26:21",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2022-01-15 15:26:21",
      "IsRowDeleted": null
    },
    {
      "id": 22,
      "Name": "RB INFOTECH SOLUTIONS",
      "VendorCode": null,
      "Address": "15 RB Building, Hebbal",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560024",
      "ContactPersonName": "Rohan Bhatia",
      "ContactPersonPhone": "+91 9448054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2022-03-22 12:16:59",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2022-03-22 12:16:59",
      "IsRowDeleted": null
    },
    {
      "id": 23,
      "Name": "MADHURI PRINT MEDIA",
      "VendorCode": null,
      "Address": "63 Madhuri Enclave, JP Nagar",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560078",
      "ContactPersonName": "Madhuri Dixit",
      "ContactPersonPhone": "+91 9880054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2022-03-24 15:35:05",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2022-03-24 15:35:05",
      "IsRowDeleted": null
    },
    {
      "id": 24,
      "Name": "SAVI ENTERPRISES",
      "VendorCode": null,
      "Address": "88 Savi Mansion, BTM Layout",
      "City": "Bangalore",
      "State": "Karnataka",
      "Country": "India",
      "PostalCode": "560068",
      "ContactPersonName": "Savita Nayak",
      "ContactPersonPhone": "+91 9611054321",
      "Notes": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "2423",
      "CreatedDateTime": "2022-04-14 16:24:54",
      "UpdatedStaffID": "2423",
      "UpdatedDateTime": "2022-04-14 16:24:54",
      "IsRowDeleted": null
    }
];

@Component({
  selector: 'app-vendor-list',
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
  templateUrl: './vendor-list.component.html',
  providers: [TableService]
})
export class VendorListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  vendors$: Observable<VendorType[]>;

  constructor(public tableService: TableService<VendorType>) {
    this.vendors$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(VENDOR_DATA, 10);
  }

  addVendor() {
    this.router.navigate(['/master/misc/vendor-new']);
  }

  editVendor(id: number) {
    this.router.navigate(['/master/misc/vendor-edit'], { queryParams: { id: id } });
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete selected vendors?')) {
      this.tableService.deleteSelectedItems();
    }
  }
}
