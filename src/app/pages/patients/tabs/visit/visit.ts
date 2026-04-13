import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';
import {
    LucideAngularModule,
    LucideBox,
    LucideLayoutGrid,
    LucideList,
    LucidePlus,
    LucideSearch,
    LucideStar,
    LucideTag,
} from 'lucide-angular';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TableService } from '@core/services/table.service';

import { currency } from '@/app/constants';
import { NgIcon } from '@ng-icons/core';
import { toTitleCase } from '@/app/utils/string-utils';
import { RatingComponent } from '@app/components/rating.component';
import { FormsModule } from '@angular/forms';
import {
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '@core/directive/sortable.directive';
import { PatientType } from '../../types';
import visitdata from '../../visit.json';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';
@Component({
    selector: 'app-visit',
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
        AsyncPipe,
        CommonModule,
    ],
    templateUrl: './visit.html',
    styleUrl: './visit.scss',
    providers: [TableService],
})
export class Visit {
    protected readonly LucideSearch = LucideSearch;
    protected readonly LucideLayoutGrid = LucideLayoutGrid;
    protected readonly LucideList = LucideList;
    protected readonly LucidePlus = LucidePlus;

    protected readonly currency = currency;
    protected readonly toTitleCase = toTitleCase;

    statusFilter = 'All';
    dateFilter = 'all';
    selectAll = false;

    total$: Observable<number>;
    visit$: Observable<any[]>;

    // ✅ STORE ORIGINAL DATA
    allvisit: any[] = [];
    @ViewChild('viewModal') viewModal!: TemplateRef<any>;
    selectedVisit: any;

    constructor(
        public tableService: TableService<any>,
        private modalService: NgbModal,
        private route: ActivatedRoute,
    ) {
        this.visit$ = this.tableService.items$;
        this.total$ = this.tableService.total$;
    }

    openViewModal(visit: any) {
        this.selectedVisit = visit;
        this.modalService.open(this.viewModal, { size: 'lg' });
    }

    ngOnInit(): void {
        const patientId = this.route.snapshot.paramMap.get('id');

        const data: any = visitdata;

        if (data.patientId == patientId) {
            this.allvisit = data.visits.map((v: any) => ({
                id: v.visitId,
                date: v.date,
                doctor: v.doctor,
                complaint: v.complaint,
                diagnosis: v.diagnosis,
                followUp: v.followUpDate,

                // ✅ ADD THESE
                vitals: v.vitals,
                prescription: v.prescription,
                notes: v.notes,
            }));
        } else {
            this.allvisit = [];
        }

        this.tableService.setItems(this.allvisit, 8);
    }

    // -------------------------
    // ACTIONS
    // -------------------------

    toggleAllSelection() {
        this.tableService.setAllSelection(this.selectAll);
    }

    toggleSingleSelection() {
        this.tableService.items$
            .subscribe((items) => {
                this.selectAll = items.every((item: any) => item.selected);
            })
            .unsubscribe();
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

    applyFilters() {
        let filtered = [...this.allvisit];

        const today = new Date();

        // 🔹 DATE FILTER
        switch (this.dateFilter) {
            case 'today':
                filtered = filtered.filter(
                    (p) =>
                        new Date(p.date).toDateString() ===
                        today.toDateString(),
                );
                break;

            case 'week':
                const weekAgo = new Date();
                weekAgo.setDate(today.getDate() - 7);

                filtered = filtered.filter((p) => {
                    const visitDate = new Date(p.date);
                    return visitDate >= weekAgo && visitDate <= today;
                });
                break;

            case '100':
                filtered = filtered.slice(0, 100);
                break;

            case '500':
                filtered = filtered.slice(0, 500);
                break;

            case '1000':
                filtered = filtered.slice(0, 1000);
                break;
        }

        // 🔹 SEARCH FILTER
        if (this.tableService.searchTerm) {
            const term = this.tableService.searchTerm.toLowerCase();

            filtered = filtered.filter(
                (v) =>
                    v.doctor?.toLowerCase().includes(term) ||
                    v.complaint?.toLowerCase().includes(term) ||
                    v.diagnosis?.toLowerCase().includes(term),
            );
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
    deleteVisit(id: number) {
        this.allvisit = this.allvisit.filter((v) => v.id !== id);
        this.tableService.setItems(this.allvisit, this.tableService.pageSize);
    }
    applyDateFilter() {
  this.applyFilters();
}
}
