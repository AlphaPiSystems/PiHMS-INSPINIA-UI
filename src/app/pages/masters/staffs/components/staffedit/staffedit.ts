import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, Calendar } from 'lucide-angular';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';

import { STAFF_LIST, HONORIFIC_LIST, DESIGNATION_LIST, DEPARTMENT_LIST, STATUS_LIST } from '../staff/staff-data';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundStaff = STAFF_LIST.find(s => s.id === id);
      if (foundStaff) {
        this.staff = { ...foundStaff };
      }
    }
  }

  saveChanges() {
    console.log('Saving staff data:', this.staff);
  }
}