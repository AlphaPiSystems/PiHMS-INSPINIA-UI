import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgIcon } from '@ng-icons/core';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { PageTitleComponent } from '@app/components/page-title.component';
import { TableService } from '@core/services/table.service';
import { TestTemplateType } from '../../types';

@Component({
  selector: 'app-testtemplate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    NgIcon,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    AsyncPipe,
    PageTitleComponent
  ],
  templateUrl: './testtemplate.html',
  providers: [TableService],
})
export class TestTemplate implements OnInit {
  protected readonly LucideSearch = LucideSearch;

  selectAll = false;
  total$: Observable<number>;
  templates$: Observable<TestTemplateType[]>;
  allTemplates: TestTemplateType[] = [];
  Math = Math;

  private http = inject(HttpClient);

  constructor(public tableService: TableService<TestTemplateType>) {
    this.templates$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<{ testtemplate: TestTemplateType[] }>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.testtemplate) {
          this.allTemplates = data.testtemplate
            .filter(t => t.IsRowDeleted !== 'Y')
            .map(t => ({ ...t, selected: false }));
          this.tableService.setItems(this.allTemplates, this.tableService.pageSize);
        }
      },
      error: (err) => {
        console.error('Error loading test templates:', err);
      }
    });
  }

  toggleAllSelection() {
    this.tableService.setAllSelection(this.selectAll);
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete selected templates?')) {
      this.tableService.deleteSelectedItems();
      this.selectAll = false;
    }
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }
}
