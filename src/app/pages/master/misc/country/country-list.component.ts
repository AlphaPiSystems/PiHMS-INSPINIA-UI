import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface CountryType {
  id: number;
  Name: string;
  IsSupported: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

export const COUNTRY_DATA: CountryType[] = [
    {
      "id": 1,
      "Name": "India",
      "IsSupported": "Y",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    },
    {
      "id": 2,
      "Name": "USA",
      "IsSupported": "N",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-country-list',
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
  templateUrl: './country-list.component.html',
  providers: [TableService]
})
export class CountryListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  countries$: Observable<CountryType[]>;

  constructor(public tableService: TableService<CountryType>) {
    this.countries$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(COUNTRY_DATA, 10);
  }

  addCountry() {
    this.router.navigate(['/master/misc/country-new']);
  }

  editCountry(id: number) {
    this.router.navigate(['/master/misc/country-edit'], { queryParams: { id: id } });
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
