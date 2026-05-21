import { Component,OnInit } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import visitdata from '../../visit.json';

@Component({
  selector: 'app-visit-view',
  imports: [FormsModule, PageTitleComponent, RouterLink],
  templateUrl: './visit-view.html',
  styleUrl: './visit-view.scss',
})
export class VisitView implements OnInit {
  visitId: string | null = null;
  constructor(private route: ActivatedRoute, private location: Location) {}
  ngOnInit(): void {

  this.visitId = this.route.snapshot.paramMap.get('id');
  const visitId = this.visitId;

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

  goBack(): void {
    this.location.back();
  }
}
