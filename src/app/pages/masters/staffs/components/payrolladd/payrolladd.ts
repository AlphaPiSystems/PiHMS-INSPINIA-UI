import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-payrolladd',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent, NgbNavModule],
  templateUrl: './payrolladd.html',
})
export class StaffPayrollAdd implements OnInit {
  payroll: any = {};
  staffs: any[] = [];
  departments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
        this.departments = data.departments || [];
      }
    });

    this.payroll = {
      id: null,
      StaffID: '',
      Employer: '',
      WorkingPeriodFrom: '',
      WorkingPeriodTo: '',
      PositionHeld: '',
      Department: '',
      Speciality: '',
      Discipline: '',
      BranchID: 1,
      DepartmentID: 1,
      CreatedStaffID: '1',
      CreatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      UpdatedStaffID: null,
      UpdatedDateTime: null,
      IsRowDeleted: 'N',
      BASIC: 0,
      HRA: 0,
      CA: 0,
      MA: 0,
      VA: 0,
      PB: 0,
      PF: 0,
      PT: 0,
      TDS: 0,
      ESI: 0,
      ADV: 0
    };
  }

  saveChanges() {
    console.log('Saving staff payroll data:', this.payroll);
  }
}
