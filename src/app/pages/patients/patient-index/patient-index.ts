import {Component, OnInit} from '@angular/core';
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
import {FormsModule} from '@angular/forms';
import {NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from '@ng-bootstrap/ng-bootstrap';

import {PatientType} from '../types';
import patientData from '../patientdata.json';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-index',
  imports: [
        PageTitleComponent,
        LucideAngularModule,
        RouterLink,
        NgIcon,
        FormsModule,
        NgbPagination,
        NgbPaginationNext,
        NgbPaginationPrevious,
        AsyncPipe,CommonModule   ],
  templateUrl: './patient-index.html',
  styleUrl: './patient-index.scss',
  providers:[TableService],
})
export class PatientIndex implements OnInit {

  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideLayoutGrid = LucideLayoutGrid;
  protected readonly LucideList = LucideList;
  protected readonly LucidePlus = LucidePlus;

  protected readonly currency = currency;
  protected readonly toTitleCase = toTitleCase;

  statusFilter = "All";
  dateFilter = 'all';
  selectAll = false;

  total$: Observable<number>;
  patients$: Observable<PatientType[]>;

  // ✅ STORE ORIGINAL DATA
  allPatients: any[] = [];

  constructor(public tableService: TableService<PatientType>) {
    this.patients$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {

    const data: any[] = patientData;

    this.allPatients = data.map(p => ({
      id: p.id,
      uhid: p.patientNo,
      name: `${p.firstName} ${p.lastName}`,
      age: p.age,
      gender: p.gender,
      phone: p.phoneNumber,
      registereddate: p.registrationDate,
      lastVisit: p.registrationDate
    }));

    this.tableService.setItems(this.allPatients, 8);
  }

  // -------------------------
  // ACTIONS
  // -------------------------

  toggleAllSelection() {
    this.tableService.setAllSelection(this.selectAll);
  }

  toggleSingleSelection() {
    this.tableService.items$.subscribe(items => {
      this.selectAll = items.every((item: any) => item.selected);
    }).unsubscribe();
  }

  deleteSelected() {
    this.tableService.deleteSelectedItems();
    this.selectAll = false;
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  // -------------------------
  // FILTER
  // -------------------------

  applyDateFilter() {

    let filtered = [];
    const today = new Date();

    switch (this.dateFilter) {

      case 'today':
        filtered = this.allPatients.filter(p =>
          new Date(p.lastVisit).toDateString() === today.toDateString()
        );
        break;

      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);

        filtered = this.allPatients.filter(p => {
          const visitDate = new Date(p.lastVisit);
          return visitDate >= weekAgo && visitDate <= today;
        });
        break;

      case '100':
        filtered = this.allPatients.slice(0, 100);
        break;

      case '500':
        filtered = this.allPatients.slice(0, 500);
        break;

      case '1000':
        filtered = this.allPatients.slice(0, 1000);
        break;

      default:
        filtered = this.allPatients;
    }

    this.tableService.setItems(filtered, this.tableService.pageSize);
  }

  // -------------------------

  protected readonly LucideTag = LucideTag;
  protected readonly LucideBox = LucideBox;
  protected readonly LucideStar = LucideStar;

  truncateText(text: string, limit: number = 21): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

}
