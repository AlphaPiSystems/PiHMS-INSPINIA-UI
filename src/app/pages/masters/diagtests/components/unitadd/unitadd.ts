import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { Location } from '@angular/common';

@Component({
  selector: 'app-unitadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './unitadd.html',
})
export class UnitAdd implements OnInit {
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

  unit: any = null;

  categories: string[] = [
    'Mass/Volume', 'Molar Concentration', 'Enzyme Activity',
    'Cell Count', 'Calculation', 'Proportion', 'Mass',
    'Volume', 'Biological Activity', 'Time', 'Rate',
    'Electrolyte Concentration', 'Excretion Rate'
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.unit = this.testUnits.find(u => u.id === id);
      }
    });

    // Initialize empty object for Add New Unit
    this.unit = {
      Name: '',
      FullName: '',
      Category: '',
      Status: 'Active'
    };
  }

  save() {
    console.log('Saving unit:', this.unit);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}