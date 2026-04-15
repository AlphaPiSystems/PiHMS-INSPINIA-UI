import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  LucideSearch,
  LucideList,
  LucideUserCheck,
  LucideBedDouble,
  LucideCalendar,
  LucideInfo,
  LucidePrinter,
  LucideDownload,
  LucideChevronRight,
  LucidePlus,
  LucideArrowLeft
} from 'lucide-angular';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

import billData from '../../bill.json';
import patientData from '../../patientdata.json';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NgxDaterangepickerBootstrapDirective],
  templateUrl: './billing.html',
  styleUrl: './billing.scss',
})
export class Billing implements OnInit {

  // ✅ expose ALL icons to HTML
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideList = LucideList;
  protected readonly LucideUserCheck = LucideUserCheck;
  protected readonly LucideBedDouble = LucideBedDouble;
  protected readonly LucideCalendar = LucideCalendar;
  protected readonly LucideInfo = LucideInfo;
  protected readonly LucidePrinter = LucidePrinter;
  protected readonly LucideDownload = LucideDownload;
  protected readonly LucideChevronRight = LucideChevronRight;
  protected readonly LucidePlus = LucidePlus;
  protected readonly LucideArrowLeft = LucideArrowLeft;

  allBills: any[] = [];
  filteredBills: any[] = [];
  selectedBill: any = null;
  patient: any = null;

  // Filters
  searchTerm: string = '';
  typeFilter: string = 'All';
  selectedDateRange: any = null;
  showMobileDetails: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const patientId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Load Patient Info
    const allPatients: any[] = patientData as any[];
    this.patient = allPatients.find(p => p.id === patientId) ?? null;

    // Load Bills for this patient
    const bills: any[] = billData as any[];
    this.allBills = bills.filter(b => b.patientId === patientId);
    
    this.applyFilters();

    // Default selection
    if (this.filteredBills.length > 0) {
      this.selectedBill = this.filteredBills[0];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 1200) {
      this.showMobileDetails = false;
    }
  }

  selectBill(bill: any): void {
    this.selectedBill = bill;
    if (window.innerWidth < 1200) {
      this.showMobileDetails = true;
    }
  }

  backToList(): void {
    this.showMobileDetails = false;
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBills = this.allBills.filter(bill => {
      // Type filter
      if (this.typeFilter !== 'All' && bill.type !== this.typeFilter) return false;

      // Search filter
      const matchesSearch = 
        bill.billName.toLowerCase().includes(term) ||
        bill.billId.toString().includes(term) ||
        bill.doctor.toLowerCase().includes(term);
      
      if (!matchesSearch) return false;

      // Date range filter (if selected)
      if (this.selectedDateRange && this.selectedDateRange.startDate && this.selectedDateRange.endDate) {
        const billDate = new Date(bill.date);
        const start = this.selectedDateRange.startDate.toDate();
        const end = this.selectedDateRange.endDate.toDate();
        if (billDate < start || billDate > end) return false;
      }

      return true;
    });

    // If selected bill is No longer in filtered list, select first available or null
    if (this.selectedBill && !this.filteredBills.some(b => b.billId === this.selectedBill.billId)) {
      this.selectedBill = this.filteredBills.length > 0 ? this.filteredBills[0] : null;
    } else if (!this.selectedBill && this.filteredBills.length > 0) {
       this.selectedBill = this.filteredBills[0];
    }
  }

  getTypeBadgeClass(type: string): string {
    return type === 'OP' ? 'badge-soft-primary' : 'badge-soft-success';
  }

  getBillTotal(bill: any): number {
    if (!bill || !bill.items) return 0;
    return bill.items.reduce((acc: number, item: any) => acc + (item.amount * (item.units || 1)), 0);
  }
}
