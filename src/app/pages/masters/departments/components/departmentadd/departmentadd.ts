import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DepartmentService } from '../../../../../core/services/department.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-departmentadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentadd.html',
})
export class DepartmentAdd implements OnInit {
  department: any = {};
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private departmentService: DepartmentService,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Load branches from master data
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data && data.hospitalbuilding) {
        this.branches = data.hospitalbuilding;
      }
    });

    this.department = {
      id: Math.floor(Math.random() * 1000) + 100, // Numeric ID
      Name: '',
      Description: '',
      BranchID: 1,
      DepartmentID: 1,
      CreatedStaffID: '1',
      CreatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      UpdatedStaffID: '1',
      UpdatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      IsRowDeleted: 'N',
      ReportPriority: 0
    };
  }

  saveChanges(form?: any) {
    if (form && form.invalid) {
      return;
    }
    console.log('Preparing payload for new department:', this.department);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
