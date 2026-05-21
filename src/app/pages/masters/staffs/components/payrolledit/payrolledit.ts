import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-payrolledit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent, NgbNavModule],
  templateUrl: '../payrolladd/payrolladd.html',
})
export class StaffPayrollEdit implements OnInit {
  payroll: any = {
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
  staffs: any[] = [];
  departments: any[] = [];
  payrollId: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.payrollId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
        this.departments = data.departments || [];
        
        if (data.staff_payroll) {
          const found = data.staff_payroll.find((p: any) => p.id == this.payrollId);
          if (found) {
            this.payroll = { ...this.payroll, ...found };
          }
        }
      }
    });
  }

  saveChanges(form: any) {
    if (form && form.invalid) {
      return;
    }
    console.log('Updating staff payroll data:', this.payroll);
    this.router.navigate(['/staff/payroll/payrolllist']);
  }
}
