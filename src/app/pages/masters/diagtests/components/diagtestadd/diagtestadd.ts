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
    selector: 'app-diagtestadd',
    standalone: true,
    imports: [CommonModule, NgIcon,RouterLink,CountUpModule,FormsModule, NgxDaterangepickerBootstrapDirective, PageTitleComponent],
    templateUrl: './diagtestadd.html',
    styleUrls: ['./diagtestadd.scss']
})
export class DiagTestAdd implements OnInit {

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
  activePrescriptions: number = 0;

  insurance: any = null;

  referenceRanges: any[] = [
    { id: 1, ageStart: '', ageEnd: '', ageUnit: 'Year', gender: 'Female', minVal: '', maxVal: '', minPanic: '', maxPanic: '', unit: '', rangeType: 'SingleTextLine', rangeText: '', ageError: false },
    { id: 2, ageStart: '', ageEnd: '', ageUnit: 'Year', gender: 'Male', minVal: '', maxVal: '', minPanic: '', maxPanic: '', unit: '', rangeType: 'SingleTextLine', rangeText: '', ageError: false }
  ];

  addReferenceRange() {
    this.referenceRanges.push({
      id: this.referenceRanges.length > 0 ? Math.max(...this.referenceRanges.map(r => r.id)) + 1 : 1,
      ageStart: 0,
      ageEnd: 100,
      ageUnit: 'Year',
      gender: 'Both',
      minVal: '',
      maxVal: '',
      minPanic: '',
      maxPanic: '',
      unit: '',
      rangeType: 'SingleTextLine',
      rangeText: '',
      ageError: false
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

    // Initialize patient object if not found (for Add functionality)
    if (!this.patient) {
      this.patient = {};
    }

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