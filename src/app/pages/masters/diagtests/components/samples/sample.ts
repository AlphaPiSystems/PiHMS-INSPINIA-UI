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
// import { TestUnit } from '../../types'
import { SAMPLE_LIST } from './sample-data';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample',
  standalone: true,
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
  templateUrl: './sample.html',
  styleUrl: './sample.scss',
  providers:[TableService],
})
export class Sample implements OnInit {

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
  samples$: Observable<any[]>;

  // ✅ STORE ORIGINAL DATA
  allSamples: any[] = [];

  constructor(public tableService: TableService<any>) {
    this.samples$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

ngOnInit(): void {
  this.allSamples = SAMPLE_LIST;
  this.tableService.setItems(this.allSamples, this.tableService.pageSize);
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
    switch (this.dateFilter) {
      default:
        filtered = this.allSamples;
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
