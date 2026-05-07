import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './test-new.component.html',
  styleUrl: './test-new.component.scss'
})
export class TestNewComponent {
  patient: any = {
    Type: 'SNG'
  };

  referenceRanges: any[] = [
    { sl: 1, ageStart: 0, ageEnd: 0, ageUnit: 'Year', gender: 'Female', minVal: '', maxVal: '', minPanic: '', maxPanic: '', unit: '', rangeType: 'SingleTextLine', rangeText: '' },
    { sl: 2, ageStart: 0, ageEnd: 0, ageUnit: 'Year', gender: 'Male', minVal: '', maxVal: '', minPanic: '', maxPanic: '', unit: '', rangeType: 'SingleTextLine', rangeText: '' }
  ];

  addReferenceRange() {
    this.referenceRanges.push({
      sl: this.referenceRanges.length + 1,
      ageStart: 0,
      ageEnd: 0,
      ageUnit: 'Year',
      gender: '',
      minVal: '',
      maxVal: '',
      minPanic: '',
      maxPanic: '',
      unit: '',
      rangeType: 'SingleTextLine',
      rangeText: ''
    });
  }

  validateAgeRange(range: any) {
    if (range.ageStart > range.ageEnd) {
      range.ageError = true;
    } else {
      range.ageError = false;
    }
  }
}
