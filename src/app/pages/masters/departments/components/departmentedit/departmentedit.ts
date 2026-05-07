import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DepartmentService } from '../../../../../core/services/department.service';
import { Department as DepartmentType } from '../../../../../types/department';

@Component({
  selector: 'app-departmentedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentedit.html',
})
export class DepartmentEdit implements OnInit {
  department: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];

  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    const stateDept = history.state.department;
    if (stateDept) {
      this.department = { ...stateDept };
    } else {
      this.router.navigate(['/department/departmentlist']);
    }
  }

  saveChanges() {
    this.department.UpdatedDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log('Preparing payload for updating department:', this.department);
    
    this.departmentService.updateDepartment(this.department).subscribe({
      next: (response) => {
        console.log('Department updated successfully:', response);
        this.router.navigate(['/department/departmentlist']);
      },
      error: (err) => {
        // Even if it fails (because of no backend), we log it
        console.error('Error updating department (Expected if no backend API exists):', err);
        // For demonstration purposes, we still navigate
        this.router.navigate(['/department/departmentlist']);
      }
    });
  }
}
