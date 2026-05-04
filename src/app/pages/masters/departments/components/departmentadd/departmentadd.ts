import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-departmentadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentadd.html',
})
export class DepartmentAdd implements OnInit {
  department: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = [
    'Andrology', 'Bio Chemistry', 'Cardiology', 'Clinical Pathology', 'Cyto-Pathology',
    'Gastroenterology', 'Haematology', 'Histo-Pathology', 'Microbiology', 'Radiology',
    'Serology', 'Anaesthetics', 'Diagnostic imaging (X-Ray)', 'Ear nose and throat (ENT)',
    'General surgery', 'Gynaecology', 'Nephrology', 'Neurology', 'Nutrition and dietetics',
    'Obstetrics and gynaecology', 'Oncology', 'Ophthalmology', 'Orthopaedics',
    'Physiotherapy', 'Radiotherapy', 'Rheumatology', 'Urology', 'Pediatricians',
    'Physician', 'General Physician(Lady)', 'Phychaiatrist', 'Dermatologist',
    'Plastic Surgeon', 'Homeopathy', 'ENDOCRINOLOGY'
  ];
  priorities = ['Normal', 'Medium', 'High', 'Urgent'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.department = {
      id: null,
      Name: '',
      Description: '',
      BranchName: '',
      ParentDepartment: '',
      ReportPriority: 'Normal'
    };
  }

  saveChanges() {
    console.log('Saving department data:', this.department);
  }
}
