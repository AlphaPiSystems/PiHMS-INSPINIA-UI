import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface DistrictType {
  id: number;
  Name: string;
  StateName: string;
  CountryName: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

export const DISTRICT_DATA: DistrictType[] = [
    {
      "id": 1,
      "Name": "Mumbai City",
      "StateName": "Maharashtra",
      "CountryName": "India",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    },
    {
      "id": 2,
      "Name": "Pune District",
      "StateName": "Maharashtra",
      "CountryName": "India",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-district-list',
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
  templateUrl: './district-list.component.html',
  providers: [TableService]
})
export class DistrictListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  districts$: Observable<DistrictType[]>;

  constructor(public tableService: TableService<DistrictType>) {
    this.districts$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(DISTRICT_DATA, 10);
  }

  addDistrict() {
    this.router.navigate(['/master/misc/district-new']);
  }

  editDistrict(id: number) {
    this.router.navigate(['/master/misc/district-edit'], { queryParams: { id: id } });
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
