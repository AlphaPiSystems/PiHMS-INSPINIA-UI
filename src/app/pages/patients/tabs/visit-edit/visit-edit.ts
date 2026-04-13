import { Component,OnInit } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import visitdata from '../../visit.json';

@Component({
  selector: 'app-visit-edit',
  imports: [FormsModule, PageTitleComponent],
  templateUrl: './visit-edit.html',
  styleUrl: './visit-edit.scss',
})
export class VisitEdit implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {

  const visitId = this.route.snapshot.paramMap.get('id');

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

      medicine: visit.prescription?.[0]?.medicine || '',
      dosage: visit.prescription?.[0]?.dosage || '',
      duration: visit.prescription?.[0]?.duration || '',

      notes: visit.notes,
      followUpDate: visit.followUpDate
    };
  }

}

  form = {
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
  medicine: '',
  dosage: '',
  duration: '',
  notes: '',
  followUpDate: ''
};

saveVisit() {
  console.log(this.form);
}

}
