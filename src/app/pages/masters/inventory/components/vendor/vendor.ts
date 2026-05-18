import { Component, OnInit, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '../../../../../core/services/table.service';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    LucideAngularModule,
    RouterLink,
    NgIcon,
    FormsModule,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    NgbTooltipModule,
    AsyncPipe
  ],
  templateUrl: './vendor.html',
  providers: [TableService],
})
export class VendorList implements OnInit {
  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  items$: Observable<any[]>;

  allVendors: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.vendors) {
          this.allVendors = data.vendors;
          this.tableService.setItems(this.allVendors, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading vendors from JSON:', err);
      }
    });
  }
}
