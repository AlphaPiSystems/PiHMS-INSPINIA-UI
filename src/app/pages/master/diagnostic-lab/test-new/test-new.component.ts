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

  samples: any[] = [
    { id: 1, FullName: "Blood", ShortName: "", Code: "SMP001", Description: "Plain Blood used BioChemistry Investigation", SampleForm: "Liquid", Container: "Plain Tube", BranchName: "Main Branch", DepartmentName: "Bio Chemistry" },
    { id: 2, FullName: "EDTA Blood", ShortName: "edta", Code: "SMP002", Description: "", SampleForm: "Liquid", Container: "EDTA Tube", BranchName: "Main Branch", DepartmentName: "Haematology" },
    { id: 3, FullName: "Citrate Blood", ShortName: "", Code: "SMP003", Description: "", SampleForm: "Liquid", Container: "Citrate Tube", BranchName: "Main Branch", DepartmentName: "Haematology" },
    { id: 4, FullName: "Heparin Blood", ShortName: "", Code: "SMP004", Description: "", SampleForm: "Liquid", Container: "Heparin Tube", BranchName: "Main Branch", DepartmentName: "Haematology" },
    { id: 5, FullName: "Urine", ShortName: "", Code: "SMP005", Description: "", SampleForm: "Liquid", Container: "Urine Container", BranchName: "Main Branch", DepartmentName: "Bio Chemistry" },
    { id: 6, FullName: "24 Hours Urine", ShortName: "", Code: "SMP006", Description: "", SampleForm: "Liquid", Container: "24H Urine Jar" },
    { id: 7, FullName: "PUS", ShortName: "", Code: "SMP007", Description: "", SampleForm: "Semi-solid", Container: "Sterile Container" },
    { id: 8, FullName: "Sputum", ShortName: "", Code: "SMP008", Description: "", SampleForm: "Semi-solid", Container: "Sputum Cup" },
    { id: 9, FullName: "Aspirated Fluid", ShortName: "", Code: "SMP009", Description: "", SampleForm: "Liquid", Container: "Sterile Tube" },
    { id: 10, FullName: "CSF", ShortName: "", Code: "SMP010", Description: "", SampleForm: "Liquid", Container: "CSF Tube" },
    { id: 11, FullName: "SWAB", ShortName: "", Code: "SMP011", Description: "", SampleForm: "Solid", Container: "Swab Stick" },
    { id: 12, FullName: "Smears", ShortName: "", Code: "SMP012", Description: "", SampleForm: "Solid", Container: "Glass Slide" },
    { id: 13, FullName: "Spicimens", ShortName: "", Code: "SMP013", Description: "", SampleForm: "Solid", Container: "Formalin Jar" },
    { id: 14, FullName: "Stool", ShortName: "", Code: "SMP014", Description: "", SampleForm: "Semi-solid", Container: "Stool Container" },
    { id: 15, FullName: "Semen", ShortName: "semen", Code: "SMP015", Description: "semen", SampleForm: "Liquid", Container: "Sterile Container" },
    { id: 16, FullName: "Serum", ShortName: "Serum", Code: "SMP016", Description: "Serum", SampleForm: "Liquid", Container: "Plain Tube" }
  ];

  validateAgeRange(range: any) {
    if (range.ageStart > range.ageEnd) {
      range.ageError = true;
    } else {
      range.ageError = false;
    }
  }
}
