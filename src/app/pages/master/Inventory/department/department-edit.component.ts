import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { DEPARTMENT_DATA } from './department-list.component';

@Component({
  selector: 'app-department-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './department-edit.component.html',
})
export class DepartmentEditComponent implements OnInit {
  departmentId: string | null = null;
  departmentData: any = {
    id: null,
    Name: '',
    Description: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.departmentId = params['id'];
        this.loadDepartment(this.departmentId);
      }
    });
  }

  loadDepartment(id: string | null): void {
    if (id) {
      const found = DEPARTMENT_DATA.find(c => c.id === Number(id));
      if (found) {
        this.departmentData = { ...found };
      }
    }
  }

  updateDepartment(): void {
    console.log('Department updated:', this.departmentData);
    this.router.navigate(['/master/department/department-list']);
  }
}
