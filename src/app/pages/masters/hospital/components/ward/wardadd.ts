import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { WARD_TYPES, STATUS_LIST } from '../ward/ward-data';
import { STAFF_LIST as FLOOR_LIST } from '../floor/hospital-data';
import { BUILDING_LIST } from '../hospitalbuilding/hospitalbuilding-data';
import { DEPARTMENT_LIST } from '../../../staffs/components/staff/staff-data';

@Component({
  selector: 'app-wardadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardadd.html',
})
export class WardAdd implements OnInit {
  ward: any = {};
  wardTypes = WARD_TYPES;
  floors = FLOOR_LIST;
  buildings = BUILDING_LIST;
  departments = DEPARTMENT_LIST;
  statuses = STATUS_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ward = {
      id: null,
      WardNumber: '',
      Name: '',
      Description: '',
      FloorID: '',
      WardTypeID: '',
      PhoneNumber: '',
      ExtensionNumber: '',
      BranchID: 1,
      DepartmentID: '',
      Status: 'Active'
    };
  }

  saveChanges() {
    console.log('Saving ward data:', this.ward);
  }
}
