import { Component } from '@angular/core';
import { PageTitleComponent } from '@app/components/page-title.component';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-visit-new',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, NgIcon],
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
    prescription: [{ medicine: '', dosage: '', duration: '' }],
    notes: '',
    followUpDate: ''
  };

  addMedicine() {
    this.form.prescription.push({ medicine: '', dosage: '', duration: '' });
  }

  removeMedicine(index: number) {
    this.form.prescription.splice(index, 1);
  }

  saveVisit() {
    console.log(this.form);
  }
}
