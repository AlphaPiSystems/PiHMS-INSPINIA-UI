import { Component, OnInit, inject } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';
import {
  LucideAngularModule,
  LucideBox,
  LucideLayoutGrid,
  LucideList,
  LucidePlus,
  LucideSearch,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '@core/services/table.service';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '@core/directive/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill-item',
  standalone: true,
  imports: [
    PageTitleComponent,
    LucideAngularModule,
    RouterLink,
    NgIcon,
    FormsModule,
    NgbPagination,
    NgbdSortableHeader,
    NgbPaginationNext,
    NgbPaginationPrevious,
    AsyncPipe,
    CommonModule,
    NgbTooltip
  ],
  templateUrl: './billitem.html',
  styleUrl: './billitem.scss',
  providers: [TableService],
})
export class BillItem implements OnInit {

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideBox = LucideBox;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  billItems$: Observable<any[]>;

  allBillItems: any[] = [];
  typeFilter: string = 'all';
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.billItems$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<{ bill_item: any[] }>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.bill_item) {
          this.allBillItems = data.bill_item;
          this.applyTypeFilter();
        }
      },
      error: (err) => {
        console.error('Error loading bill items from JSON:', err);
      }
    });
  }

  applyTypeFilter() {
    let filtered = this.allBillItems;
    if (this.typeFilter !== 'all') {
      filtered = this.allBillItems.filter(i => i.Type === this.typeFilter);
    }
    this.tableService.setItems(filtered, this.tableService.pageSize);
  }

  deleteSelected() {
    this.tableService.deleteSelectedItems();
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }
}
