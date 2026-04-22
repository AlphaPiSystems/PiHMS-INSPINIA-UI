import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute ,RouterLink} from '@angular/router';
import patientData from '../../diagtestdata.json'
import { CountUpModule } from 'ngx-countup';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

@Component({
    selector: 'app-diagtestadd_horizontal',
    standalone: true,
    imports: [CommonModule, NgIcon,RouterLink,CountUpModule,FormsModule, NgxDaterangepickerBootstrapDirective],
    templateUrl: './diagtestadd_horizontal.html',
})
export class DiagTestAddHorizontal implements OnInit {

  lastVisit: any = null;
  patient: any = null;

  totalVisits: number = 0;
  pendingBill: number = 0;
  unpaidInvoices: number = 0;
  upcomingVisits: number = 0;
  totalLabReports: number = 0;
  newLabReports: number = 0;
  totalScans: number = 0;
  activePrescriptions: number = 0;

  insurance: any = null;

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