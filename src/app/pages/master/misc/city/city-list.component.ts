import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface CityType {
  id: number;
  Name: string;
  DistrictName: string;
  StateName: string;
  CountryName: string;
  Type: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

export const CITY_DATA: CityType[] = [
    {
      "id": 1,
      "Name": "Mumbai",
      "DistrictName": "Mumbai City",
      "StateName": "Maharashtra",
      "CountryName": "India",
      "Type": "Urban",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    },
    {
      "id": 2,
      "Name": "Pune",
      "DistrictName": "Pune District",
      "StateName": "Maharashtra",
      "CountryName": "India",
      "Type": "Urban",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-city-list',
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
  templateUrl: './city-list.component.html',
  providers: [TableService]
})
export class CityListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  cities$: Observable<CityType[]>;

  constructor(public tableService: TableService<CityType>) {
    this.cities$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(CITY_DATA, 10);
  }

  addCity() {
    this.router.navigate(['/master/misc/city-new']);
  }

  editCity(id: number) {
    this.router.navigate(['/master/misc/city-edit'], { queryParams: { id: id } });
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
