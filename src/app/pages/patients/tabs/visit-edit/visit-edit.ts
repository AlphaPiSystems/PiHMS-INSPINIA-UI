import { Component,OnInit } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import visitdata from '../../visit.json';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-visit-edit',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, NgIcon],
  templateUrl: './visit-edit.html',
  styleUrl: './visit-edit.scss',
})
export class VisitEdit implements OnInit {
  isViewMode: boolean = false;

  form: any = {
    date: '',
    doctor: '',
    department: '',
    complaint: '',
    vitals: {
      temperature: '',
      bp: '',
      pulse: '',
      weight: ''
    },
    diagnosis: '',
    prescription: [{ medicine: '', dosage: '', duration: '' }],
    notes: '',
    followUpDate: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const visitId = this.route.snapshot.paramMap.get('id');
    const mode = this.route.snapshot.queryParamMap.get('mode');

    if (mode === 'view') {
      this.isViewMode = true;
    }

    const data: any = visitdata;

    const visit = data.visits.find((v: any) => v.visitId == visitId);

    if (visit) {
      this.form = {
        date: visit.date,
        doctor: visit.doctor,
        department: visit.department,
        complaint: visit.complaint,

        vitals: {
          temperature: visit.vitals?.temperature || '',
          bp: visit.vitals?.bp || '',
          pulse: visit.vitals?.pulse || '',
          weight: visit.vitals?.weight || ''
        },

        diagnosis: visit.diagnosis,

        prescription: visit.prescription && visit.prescription.length > 0
          ? visit.prescription.map((m: any) => ({ ...m }))
          : [{ medicine: '', dosage: '', duration: '' }],

        notes: visit.notes,
        followUpDate: visit.followUpDate
      };
    }
  }

  addMedicine() {
    this.form.prescription.push({ medicine: '', dosage: '', duration: '' });
  }

  removeMedicine(index: number) {
    this.form.prescription.splice(index, 1);
  }

  enableEdit() {
    this.isViewMode = false;
  }

  printRecord() {
    window.print();
  }

  saveVisit() {
    console.log(this.form);
    this.isViewMode = true;
  }
}
