import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DEPARTMENT_LIST } from '../department/department-data';

@Component({
  selector: 'app-departmentedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentedit.html',
})
export class DepartmentEdit implements OnInit {
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = DEPARTMENT_LIST.find(d => d.id === id);
        if (found) {
          this.department = { ...found };
        } else {
          this.router.navigate(['/department/departmentlist']);
        }
      }
    });
  }

  saveChanges() {
    console.log('Saving updated department data:', this.department);
    this.router.navigate(['/department/departmentlist']);
  }
}
