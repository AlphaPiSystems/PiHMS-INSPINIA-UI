import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sampleadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './sampleadd.html',
})
export class SampleAdd implements OnInit {
  sample: any = {};
  sampleForms = ['Liquid', 'Solid', 'Semi-solid', 'Gas'];
  containers = ['Plain Tube', 'EDTA Tube', 'Citrate Tube', 'Heparin Tube', 'Urine Container', '24H Urine Jar', 'Sterile Container', 'Sputum Cup', 'Sterile Tube', 'CSF Tube', 'Swab Stick', 'Glass Slide', 'Formalin Jar', 'Stool Container'];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }
      }
    });

    this.sample = {
      id: null,
      FullName: '',
      ShortName: '',
      Code: '',
      Description: '',
      SampleForm: 'Liquid',
      Container: '',
      BranchName: '',
      DepartmentName: ''
    };
  }

  saveChanges(form: any) {
    if (form.invalid) {
      return;
    }
    console.log('Saving sample data:', this.sample);
  }
}
