import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface PostalCodeType {
  id: number;
  PostalCode: string;
  PostOfficeName: string;
  AreaName: string;
  CityName: string;
  DistrictName: string;
  StateName: string;
  CountryName: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

export const POSTAL_CODE_DATA: PostalCodeType[] = [
    {
      "id": 1,
      "PostalCode": "400001",
      "PostOfficeName": "Mumbai GPO",
      "AreaName": "Fort",
      "CityName": "Mumbai",
      "DistrictName": "Mumbai City",
      "StateName": "Maharashtra",
      "CountryName": "India",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-postal-code-list',
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
  templateUrl: './postal-code-list.component.html',
  providers: [TableService]
})
export class PostalCodeListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  postalCodes$: Observable<PostalCodeType[]>;

  constructor(public tableService: TableService<PostalCodeType>) {
    this.postalCodes$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(POSTAL_CODE_DATA, 10);
  }

  addPostalCode() {
    this.router.navigate(['/master/misc/postal-code-new']);
  }

  editPostalCode(id: number) {
    this.router.navigate(['/master/misc/postal-code-edit'], { queryParams: { id: id } });
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
