import {Component, OnInit, inject} from '@angular/core';
import {PageTitleComponent} from '@app/components/page-title.component';
import {
    LucideAngularModule,
    LucideSearch,
} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {TableService} from '@core/services/table.service';

import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from '@core/directive/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-state',
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
        AsyncPipe,CommonModule   ],
  templateUrl: './state.html',
  providers:[TableService],
})
export class State implements OnInit {

  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  states$: Observable<any[]>;

  allStates: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.states$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.state) {
          this.allStates = data.state;
          this.tableService.setItems(this.allStates, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading states from JSON:', err);
      }
    });
  }
}
