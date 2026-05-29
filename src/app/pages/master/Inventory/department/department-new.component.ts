import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-department-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './department-new.component.html',
})
export class DepartmentNewComponent {
  departmentData: any = {
    id: null,
    Name: '',
    Description: ''
  };

  constructor(private router: Router) {}

  saveDepartment() {
    console.log('Department saved:', this.departmentData);
    this.router.navigate(['/master/department/department-list']);
  }
}
