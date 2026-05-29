import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface StateType {
  id: number;
  Name: string;
  CountryName: string;
  BranchName: string;
  DepartmentName: string;
  Status: string;
  [key: string]: any;
}

export const STATE_DATA: StateType[] = [
    {
      "id": 1,
      "Name": "Maharashtra",
      "CountryName": "India",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    },
    {
      "id": 2,
      "Name": "Karnataka",
      "CountryName": "India",
      "BranchName": "Main Branch",
      "DepartmentName": "Bio Chemistry",
      "Status": "Active"
    }
];

@Component({
  selector: 'app-state-list',
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
  templateUrl: './state-list.component.html',
  providers: [TableService]
})
export class StateListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  states$: Observable<StateType[]>;

  constructor(public tableService: TableService<StateType>) {
    this.states$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(STATE_DATA, 10);
  }

  addState() {
    this.router.navigate(['/master/misc/state-new']);
  }

  editState(id: number) {
    this.router.navigate(['/master/misc/state-edit'], { queryParams: { id: id } });
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
