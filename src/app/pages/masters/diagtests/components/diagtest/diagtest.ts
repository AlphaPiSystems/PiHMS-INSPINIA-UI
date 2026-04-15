import {Component, OnInit} from '@angular/core';
import {PageTitleComponent} from '@app/components/page-title.component';
import {
    LucideAngularModule,
    LucideBox,
    LucideLayoutGrid,
    LucideList,
    LucidePlus,
    LucideSearch,
    LucideStar,
    LucideTag
} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';

import {currency} from '@/app/constants';
import {NgIcon} from '@ng-icons/core';
import {toTitleCase} from '@/app/utils/string-utils';
import {RatingComponent} from '@app/components/rating.component';
import {FormsModule} from '@angular/forms';
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import {TestType} from '../../types'
import diagtestData from '../../diagtestdata.json';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagtest',
  imports: [
        PageTitleComponent,
        LucideAngularModule,
        RouterLink,
        NgIcon,
        RatingComponent,
        FormsModule,
        NgbPagination,
        NgbdSortableHeader,
        NgbPaginationNext,
        NgbPaginationPrevious,
        AsyncPipe,CommonModule   ],
  templateUrl: './diagtest.html',
  styleUrl: './diagtest.scss',
  providers:[TableService],
})
export class DiagTest implements OnInit {

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideLayoutGrid = LucideLayoutGrid;
  protected readonly LucideList = LucideList;
  protected readonly LucidePlus = LucidePlus;

  protected readonly currency = currency;
  protected readonly toTitleCase = toTitleCase;

  statusFilter = "All";
  dateFilter = 'all';
  selectAll = false;

  total$: Observable<number>;
  tests$: Observable<TestType[]>;

  // ✅ STORE ORIGINAL DATA
  allTests: any[] = [];

  constructor(public tableService: TableService<TestType>) {
    this.tests$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

ngOnInit(): void {
  const data: TestType[] = diagtestData;

  this.allTests = data;

  console.log('Loaded Data:', this.allTests); // ✅ debug

  this.tableService.setItems(this.allTests, this.tableService.pageSize);
}
  
  // -------------------------
  // ACTIONS
  // -------------------------

  toggleAllSelection() {
    this.tableService.setAllSelection(this.selectAll);
  }

  toggleSingleSelection() {
    this.tableService.items$.subscribe(items => {
      this.selectAll = items.every((item: any) => item.selected);
    }).unsubscribe();
  }

  deleteSelected() {
    this.tableService.deleteSelectedItems();
    this.selectAll = false;
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  // -------------------------
  // FILTER
  // -------------------------

  applyDateFilter() {

    let filtered = [];
    const today = new Date();


    switch (this.dateFilter) {

      case 'SNG':
      case 'MUL':
      case 'PRO':
        filtered = this.allTests.filter(p => p.Type === this.dateFilter);
        break;

      default:
        filtered = this.allTests;
    }

  this.tableService.setItems(filtered, this.tableService.pageSize);
}

      
  // -------------------------

  protected readonly LucideTag = LucideTag;
  protected readonly LucideBox = LucideBox;
  protected readonly LucideStar = LucideStar;

  truncateText(text: string, limit: number = 21): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}
