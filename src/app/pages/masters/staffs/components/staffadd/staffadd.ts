import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, Calendar } from 'lucide-angular';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

import { STAFF_LIST, HONORIFIC_LIST, DESIGNATION_LIST, DEPARTMENT_LIST, STATUS_LIST } from '../staff/staff-data';

@Component({
  selector: 'app-staffadd',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageTitleComponent, LucideAngularModule, NgxDaterangepickerBootstrapDirective],
  templateUrl: './staffadd.html',
})
export class StaffAdd implements OnInit {
  protected readonly LucideCalendar = Calendar;
  staff: any = {};
  honorifics = HONORIFIC_LIST;
  designations = DESIGNATION_LIST;
  departments = DEPARTMENT_LIST;
  statuses = STATUS_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.staff = {
      id: null,
      Honorific: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      StaffNumber: '',
      Gender: '',
      DOB: '',
      MaritalStatus: '',
      SpouseName: '',
      EmergencyContactRelationship: '',
      BloodGroup: '',
      Nationality: '',
      Religion: '',
      PhonePrimary: '',
      EmergencyContactName: '',
      DoctorPercentage: 0,
      Designation: '',
      Department: '',
      Status: 'Active'
    };
  }

  saveChanges() {
    console.log('Saving staff data:', this.staff);
  }
}