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
  selector: 'app-country',
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
  templateUrl: './country.html',
  providers:[TableService],
})
export class Country implements OnInit {

  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  countries$: Observable<any[]>;

  allCountries: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.countries$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.country) {
          this.allCountries = data.country;
          this.tableService.setItems(this.allCountries, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading countries from JSON:', err);
      }
    });
  }

  deleteItem(id: any) {
    if (confirm('Are you sure you want to delete this country?')) {
        this.allCountries = this.allCountries.filter(c => c.id !== id);
        this.tableService.setItems(this.allCountries, this.tableService.pageSize);
    }
  }
}
