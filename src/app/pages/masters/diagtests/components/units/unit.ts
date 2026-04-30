import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test-unit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './unit.html',
})
export class TestUnit implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  testUnits: any[] = [
    { id: 1, Name: 'mg/dL', FullName: 'Milligrams per Deciliter', Category: 'Mass/Volume', Status: 'Active' },
    { id: 2, Name: 'mmol/L', FullName: 'Millimoles per Liter', Category: 'Molar Concentration', Status: 'Active' },
    { id: 3, Name: 'g/dL', FullName: 'Grams per Deciliter', Category: 'Mass/Volume', Status: 'Active' },
    { id: 4, Name: 'U/L', FullName: 'Units per Liter', Category: 'Enzyme Activity', Status: 'Active' },
    { id: 5, Name: 'cells/mcL', FullName: 'Cells per Microliter', Category: 'Cell Count', Status: 'Active' },
    { id: 6, Name: 'ratio', FullName: 'Ratio', Category: 'Calculation', Status: 'Active' },
    { id: 7, Name: '%', FullName: 'Percentage', Category: 'Proportion', Status: 'Active' },
    { id: 8, Name: 'pg', FullName: 'Picograms', Category: 'Mass', Status: 'Active' },
    { id: 9, Name: 'fL', FullName: 'Femtoliters', Category: 'Volume', Status: 'Active' },
    { id: 10, Name: 'mIU/L', FullName: 'Milli-international Units per Liter', Category: 'Biological Activity', Status: 'Active' },
    { id: 11, Name: 'ng/mL', FullName: 'Nanograms per Milliliter', Category: 'Mass/Volume', Status: 'Active' },
    { id: 12, Name: 'mcg/dL', FullName: 'Micrograms per Deciliter', Category: 'Mass/Volume', Status: 'Active' },
    { id: 13, Name: 'sec', FullName: 'Seconds', Category: 'Time', Status: 'Active' },
    { id: 14, Name: 'min', FullName: 'Minutes', Category: 'Time', Status: 'Active' },
    { id: 15, Name: 'mm/hr', FullName: 'Millimeters per Hour', Category: 'Rate', Status: 'Active' },
    { id: 16, Name: 'mEq/L', FullName: 'Milliequivalents per Liter', Category: 'Electrolyte Concentration', Status: 'Active' },
    { id: 17, Name: 'g/24h', FullName: 'Grams per 24 Hours', Category: 'Excretion Rate', Status: 'Active' },
    { id: 18, Name: 'mg/24h', FullName: 'Milligrams per 24 Hours', Category: 'Excretion Rate', Status: 'Active' }
  ];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }

  getFilteredUnits() {
    let filtered = this.testUnits;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.testUnits.filter(u => 
        u.Name.toLowerCase().includes(search) ||
        u.FullName.toLowerCase().includes(search) ||
        u.Category.toLowerCase().includes(search)
      );
    }
    return filtered;
  }

  getPaginatedUnits() {
    const filtered = this.getFilteredUnits();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredUnits().length / this.itemsPerPage);
  }
}