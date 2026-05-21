import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute ,Router,RouterLink} from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

import { PageTitleComponent } from '@app/components/page-title.component';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-diagtestadd',
    standalone: true,
    imports: [CommonModule, NgIcon,RouterLink,CountUpModule,FormsModule, NgxDaterangepickerBootstrapDirective, PageTitleComponent],
    templateUrl: './diagtestadd.html',
    styleUrls: ['./diagtestadd.scss']
})
export class DiagTestAdd implements OnInit {

  lastVisit: any = null;
  patient: any = {};
  samples: any[] = [];
  departments: any[] = [];
  instruments: any[] = [];
  units: any[] = [];

  totalVisits: number = 0;
  pendingBill: number = 0;
  unpaidInvoices: number = 0;
  upcomingVisits: number = 0;
  totalLabReports: number = 0;
  newLabReports: number = 0;
  totalScans: number = 0;
  activePrescriptions: number = 0;

  insurance: any = null;

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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  hover: string = '';

  onSubmit(form: any) {
    if (form.valid) {
      if (this.patient.HasRange === 'Yes' && (!this.referenceRanges || this.referenceRanges.length === 0)) {
        return;
      }
      console.log('Saving test data:', this.patient);
      this.router.navigate(['/diagtest/diagtestlist']);
    }
  }

  ngOnInit() {
    this.http.get<{diagtest: any[], sample: any[], departments: any[], instrument: any[], unit: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          if (data.sample) {
            this.samples = data.sample.filter((s: any) => s.IsRowDeleted === 'N');
          }
          if (data.departments) {
            this.departments = data.departments.filter((d: any) => d.IsRowDeleted === 'N');
          }
          if (data.instrument) {
            this.instruments = data.instrument.filter((i: any) => i.IsRowDeleted === 'N');
          }
          if (data.unit) {
            this.units = data.unit.filter((u: any) => u.Status === 'Active');
          }
          
          const id = Number(this.route.snapshot.paramMap.get('id'));
          if (id && data.diagtest) {
            this.patient = data.diagtest.find(p => p.id === id) || {};
          } else {
            this.patient = {};
          }

          // Mock assignment based on template requirements
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
        }
      },
      error: (err) => {
        console.error('Error fetching data for diagtestadd:', err);
      }
    });
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