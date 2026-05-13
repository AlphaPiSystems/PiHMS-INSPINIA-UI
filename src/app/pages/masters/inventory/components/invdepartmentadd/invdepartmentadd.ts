import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inv-departmentadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './invdepartmentadd.html',
})
export class InvDepartmentAdd implements OnInit {
  department: any = {};
  branches: any[] = [];
  hospDepartments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.branches = data.hospitalbuilding || [];
        this.hospDepartments = data.departments || [];
      }
    });

    this.department = {
      id: null,
      Name: '',
      Description: '',
      BranchID: '1',
      DepartmentID: '1',
      IsRowDeleted: 'N'
    };
  }

  saveChanges() {
    console.log('Saving inventory department data:', this.department);
  }
}
