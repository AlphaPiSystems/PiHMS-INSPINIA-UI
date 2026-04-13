import { Component } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-visit-new',
  imports: [PageTitleComponent, FormsModule],
  templateUrl: './visit-new.html',
  styleUrl: './visit-new.scss',
})
export class VisitNew {
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
