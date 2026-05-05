import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DepartmentService } from '../../../../../core/services/department.service';

@Component({
  selector: 'app-departmentadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentadd.html',
})
export class DepartmentAdd implements OnInit {
  department: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];

  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.department = {
      id: `DPT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      Name: '',
      Description: '',
      BranchName: 'Main Branch',
      BranchID: '1',
      DepartmentID: '1',
      CreatedStaffID: '1',
      CreatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      UpdatedStaffID: '1',
      UpdatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      IsRowDeleted: 'N',
      ReportPriority: 0
    };
  }

  saveChanges() {
    console.log('Preparing payload for new department:', this.department);
    this.departmentService.addDepartment(this.department).subscribe({
      next: (response) => {
        console.log('Department added successfully:', response);
        this.router.navigate(['/department/departmentlist']);
      },
      error: (err) => {
        // Even if it fails (because of no backend), we log it
        console.error('Error adding department (Expected if no backend API exists):', err);
        // For demonstration purposes, we still navigate
        this.router.navigate(['/department/departmentlist']);
      }
    });
  }
}
