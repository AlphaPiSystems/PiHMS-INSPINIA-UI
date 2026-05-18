import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  payroll: any = {};
  staffs: any[] = [];
  departments: any[] = [];
  payrollId: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.payrollId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
        this.departments = data.departments || [];
        
        if (data.staff_payroll) {
          const found = data.staff_payroll.find((p: any) => p.id == this.payrollId);
          if (found) {
            this.payroll = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating staff payroll data:', this.payroll);
  }
}
