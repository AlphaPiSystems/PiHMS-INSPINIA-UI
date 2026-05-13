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
  selector: 'app-insuranceprovider',
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
  templateUrl: './insuranceprovider.html',
  providers:[TableService],
})
export class InsuranceProvider implements OnInit {

  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  providers$: Observable<any[]>;

  allProviders: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.providers$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.insuranceprovider) {
          this.allProviders = data.insuranceprovider;
          this.tableService.setItems(this.allProviders, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading insurance providers from JSON:', err);
      }
    });
  }
}
