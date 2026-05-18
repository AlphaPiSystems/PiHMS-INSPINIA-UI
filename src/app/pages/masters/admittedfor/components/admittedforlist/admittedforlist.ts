import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { TableService } from '../../../../../core/services/table.service';

@Component({
  selector: 'app-admittedfor-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgIcon,
    LucideAngularModule,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    NgbTooltipModule,
    PageTitleComponent,
    AsyncPipe
  ],
  templateUrl: './admittedforlist.html',
  providers: [TableService],
})
export class AdmittedForList implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  total$: Observable<number>;
  items$: Observable<any[]>;
  
  private http = inject(HttpClient);
  
  constructor(public tableService: TableService<any>) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data && data.admittedfor) {
        const list = data.admittedfor.filter((item: any) => item.IsRowDeleted !== 'Y');
        this.tableService.setItems(list, this.tableService.pageSize);
      }
    });
  }
}
