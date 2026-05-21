import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, Calendar } from 'lucide-angular';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';
import { HttpClient } from '@angular/common/http';

import { HONORIFIC_LIST, DESIGNATION_LIST, DEPARTMENT_LIST, STATUS_LIST } from '../staff/staff-data';

@Component({
  selector: 'app-staffedit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageTitleComponent, LucideAngularModule, NgxDaterangepickerBootstrapDirective],
  templateUrl: './staffedit.html',
})
export class StaffEdit implements OnInit {
  protected readonly LucideCalendar = Calendar;
  staff: any = {};
  honorifics = HONORIFIC_LIST;
  designations = DESIGNATION_LIST;
  departments = DEPARTMENT_LIST;
  statuses = STATUS_LIST;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ staff: any[] }>('assets/data/db.json').subscribe({
        next: (data) => {
          if (data && data.staff) {
            const foundStaff = data.staff.find((s: any) => String(s.id) === String(id));
            if (foundStaff) {
              this.staff = {
                Age: null,
                IdentificationNo: '',
                PassportNumber: '',
                PassportExpiryDate: '',
                DrivingLicenceNo: '',
                DrivingLicenceExpiryDate: '',
                OtherIdentificationNo: '',
                Ethnicity: '',
                DateOfJoining: '',
                PhoneSecondary: '',
                Email: '',
                PermanentAddress: '',
                TemporaryAddress: '',
                EmergencyContactPhone: '',
                EmergencyContactEmail: '',
                Notes: '',
                ...foundStaff
              };

              // Safety check for dropdowns to ensure validity
              if (!this.honorifics.includes(this.staff.Honorific)) this.staff.Honorific = '';
              if (!this.designations.includes(this.staff.Designation)) this.staff.Designation = '';
              if (!this.departments.includes(this.staff.Department)) this.staff.Department = '';
              if (!this.statuses.includes(this.staff.Status)) this.staff.Status = '';

              const validGenders = ['Male', 'Female', 'Other'];
              if (!validGenders.includes(this.staff.Gender)) this.staff.Gender = '';

              const validRelationships = ['Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Guardian', 'Friend', 'Other'];
              if (!validRelationships.includes(this.staff.EmergencyContactRelationship)) this.staff.EmergencyContactRelationship = '';
            }
          }
        },
        error: (err) => {
          console.error('Error loading staff from JSON:', err);
        }
      });
    }
  }

  saveChanges(form: any) {
    if (form.invalid) {
      return;
    }
    console.log('Saving staff data:', this.staff);
  }
}