import { Component, OnInit, inject } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';
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
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '@core/services/table.service';
import { currency } from '@/app/constants';
import { NgIcon } from '@ng-icons/core';
import { toTitleCase } from '@/app/utils/string-utils';
import { RatingComponent } from '@app/components/rating.component';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '@core/directive/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill-domain',
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
    AsyncPipe,
    CommonModule,
    NgbTooltip
  ],
  templateUrl: './billdomain.html',
  styleUrl: './billdomain.scss',
  providers: [TableService],
})
export class BillDomain implements OnInit {

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideLayoutGrid = LucideLayoutGrid;
  protected readonly LucideList = LucideList;
  protected readonly LucidePlus = LucidePlus;

  protected readonly currency = currency;
  protected readonly toTitleCase = toTitleCase;

  typeFilter = "all";
  selectAll = false;

  total$: Observable<number>;
  billDomains$: Observable<any[]>;

  allBillDomains: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.billDomains$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<{ bill_domain: any[] }>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.bill_domain) {
          this.allBillDomains = data.bill_domain;
          this.tableService.setItems(this.allBillDomains, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading bill domains from JSON:', err);
      }
    });
  }

  applyTypeFilter() {
    let filtered = [];
    if (this.typeFilter === 'all') {
      filtered = this.allBillDomains;
    } else {
      filtered = this.allBillDomains.filter(item => item.DomainType === this.typeFilter);
    }
    this.tableService.setItems(filtered, this.tableService.pageSize);
  }

  deleteSelected() {
    this.tableService.deleteSelectedItems();
    this.selectAll = false;
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  protected readonly LucideTag = LucideTag;
  protected readonly LucideBox = LucideBox;
  protected readonly LucideStar = LucideStar;

  truncateText(text: string, limit: number = 21): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}
