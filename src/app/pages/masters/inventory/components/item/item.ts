import { Component, OnInit, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../core/services/table.service';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '../../../../../core/directive/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
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
    NgbTooltipModule
  ],
  templateUrl: './item.html',
  providers: [TableService],
})
export class ItemList implements OnInit {
  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  items$: Observable<any[]>;

  allItems: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.inventory_items) {
          this.allItems = data.inventory_items;
          this.tableService.setItems(this.allItems, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading items from JSON:', err);
      }
    });
  }
}
