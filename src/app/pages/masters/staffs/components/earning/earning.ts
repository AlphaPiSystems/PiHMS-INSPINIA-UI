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
  selector: 'app-staff-earning',
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
    NgbdSortableHeader,
    AsyncPipe
  ],
  templateUrl: './earning.html',
  providers: [TableService],
})
export class StaffEarningList implements OnInit {
  protected readonly LucideSearch = LucideSearch;

  total$: Observable<number>;
  items$: Observable<any[]>;

  allEarnings: any[] = [];
  private http = inject(HttpClient);

  constructor(public tableService: TableService<any>) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.staff_earnings && data.staff) {
          const staffMap = new Map(data.staff.map((s: any) => [String(s.id), s.Name]));
          
          this.allEarnings = data.staff_earnings
            .filter((e: any) => staffMap.has(String(e.StaffID)))
            .map((e: any) => ({
              ...e,
              StaffName: staffMap.get(String(e.StaffID))
            }));
          
          this.tableService.setItems(this.allEarnings, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading staff earnings from JSON:', err);
      }
    });
  }
}
