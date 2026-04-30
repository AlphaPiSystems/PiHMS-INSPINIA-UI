import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute ,RouterLink} from '@angular/router';
import patientData from '../../diagtestdata.json'
import { CountUpModule } from 'ngx-countup';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

import { PageTitleComponent } from '@app/components/page-title.component';
import { SAMPLE_LIST } from '../samples/sample-data';

@Component({
    selector: 'app-diagtestadd_horizontal_nc',
    standalone: true,
    imports: [CommonModule, NgIcon,RouterLink,CountUpModule,FormsModule, NgxDaterangepickerBootstrapDirective, PageTitleComponent],
    templateUrl: './diagtestadd_horizontal_nc.html',
    styleUrls: ['./diagtestadd_horizontal_nc.scss']
})
export class DiagTestAddHorizontalNC implements OnInit {

  lastVisit: any = null;
  patient: any = null;
  samples = SAMPLE_LIST;

  totalVisits: number = 0;
  pendingBill: number = 0;
  unpaidInvoices: number = 0;
  upcomingVisits: number = 0;
  totalLabReports: number = 0;
  newLabReports: number = 0;
  totalScans: number = 0;

  referenceRanges: any[] = [
    { id: 1, ageStart: 0, ageEnd: 5, ageUnit: 'Year', gender: 'Male', minVal: 60, maxVal: 321, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 2, ageStart: 0, ageEnd: 5, ageUnit: 'Year', gender: 'Female', minVal: 60, maxVal: 321, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 3, ageStart: 5, ageEnd: 10, ageUnit: 'Year', gender: 'Male', minVal: 110, maxVal: 360, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 4, ageStart: 5, ageEnd: 10, ageUnit: 'Year', gender: 'Female', minVal: 110, maxVal: 360, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 5, ageStart: 10, ageEnd: 12, ageUnit: 'Year', gender: 'Male', minVal: 103, maxVal: 373, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 6, ageStart: 10, ageEnd: 12, ageUnit: 'Year', gender: 'Female', minVal: 103, maxVal: 373, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 7, ageStart: 12, ageEnd: 16, ageUnit: 'Year', gender: 'Male', minVal: 67, maxVal: 382, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 8, ageStart: 12, ageEnd: 16, ageUnit: 'Year', gender: 'Female', minVal: 67, maxVal: 382, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 9, ageStart: 16, ageEnd: 20, ageUnit: 'Year', gender: 'Male', minVal: 36, maxVal: 113, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 10, ageStart: 16, ageEnd: 20, ageUnit: 'Year', gender: 'Female', minVal: 36, maxVal: 113, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 11, ageStart: 20, ageEnd: 60, ageUnit: 'Year', gender: 'Male', minVal: 38, maxVal: 94, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 12, ageStart: 20, ageEnd: 60, ageUnit: 'Year', gender: 'Female', minVal: 28, maxVal: 78, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 13, ageStart: 61, ageEnd: 100, ageUnit: 'Year', gender: 'Male', minVal: 43, maxVal: 88, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' },
    { id: 14, ageStart: 61, ageEnd: 100, ageUnit: 'Year', gender: 'Female', minVal: 40, maxVal: 111, minPanic: '', maxPanic: '', unit: 'U/L', rangeType: 'SingleTextLine', rangeText: '' }
  ];
  activePrescriptions: number = 0;

  insurance: any = null;

  addReferenceRange() {
    this.referenceRanges.push({
      id: this.referenceRanges.length > 0 ? Math.max(...this.referenceRanges.map(r => r.id)) + 1 : 1,
      ageStart: 0,
      ageEnd: 0,
      ageUnit: 'Year',
      gender: 'Both',
      minVal: 0,
      maxVal: 0,
      minPanic: '',
      maxPanic: '',
      unit: '',
      rangeType: 'SingleTextLine',
      rangeText: ''
    });
  }

  validateAgeRange(range: any) {
    range.ageError = false;
    
    // Ensure min and max limits
    if (range.ageStart < 0) range.ageStart = 0;
    if (range.ageStart > 100) range.ageStart = 100;
    if (range.ageEnd < 0) range.ageEnd = 0;
    if (range.ageEnd > 100) range.ageEnd = 100;

    const start = Number(range.ageStart);
    const end = Number(range.ageEnd);
    
    if (start !== null && end !== null && !isNaN(start) && !isNaN(end)) {
      if (start >= end) {
        range.ageError = true;
      }
    }
  }

  constructor(private route: ActivatedRoute) {}

  hover: string = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data: any[] = patientData;

    this.patient = data.find(p => p.id === id);

    // Example mock assignment (IMPORTANT)
    if (this.patient) {
      this.totalVisits = this.patient.visits?.length || 0;
      this.pendingBill = this.patient.pendingBill || 0;
      this.unpaidInvoices = this.patient.unpaidInvoices || 0;
      this.upcomingVisits = this.patient.upcomingVisits || 0;
      this.totalLabReports = this.patient.labReports || 0;
      this.newLabReports = this.patient.newLabReports || 0;
      this.totalScans = this.patient.scans || 0;
      this.activePrescriptions = this.patient.prescriptions || 0;
      this.insurance = this.patient.insurance || null;
      this.lastVisit = this.patient.lastVisit || null;
    }

    console.log(this.patient);
  }
  alerts: string[] = [
  'Penicillin allergy',
  'Dust allergy',
  'Pollen allergy',
  'Food allergy',
  'Drug sensitivity',
  'Latex allergy'
];

patients = {
  conditions: [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Thyroid',
    'Obesity',
    'Heart Disease',
    'Arthritis',
    'Migraine'
  ],
  surgeries: [
  { name: 'Appendectomy', date: '2023-06-15' }
]
};
}