import {Component, OnInit, inject} from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-city',
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
  templateUrl: './city.html',
  providers:[TableService],
})
export class City implements OnInit {

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;

  total$: Observable<number>;
  cities$: Observable<any[]>;

  allCities: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.cities$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.city) {
          this.allCities = data.city;
          this.tableService.setItems(this.allCities, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading cities from JSON:', err);
      }
    });
  }
}
