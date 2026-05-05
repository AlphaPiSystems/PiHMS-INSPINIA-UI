import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { WARD_LIST, WARD_TYPES, STATUS_LIST } from '../ward/ward-data';
import { STAFF_LIST as FLOOR_LIST } from '../floor/hospital-data';
import { BUILDING_LIST } from '../hospitalbuilding/hospitalbuilding-data';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

@Component({
  selector: 'app-wardedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardedit.html',
})
export class WardEdit implements OnInit {
  ward: any = {};
  wardTypes = WARD_TYPES;
  floors = FLOOR_LIST;
  buildings = BUILDING_LIST;
  departments = DEPARTMENT_LIST;
  statuses = STATUS_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundWard = WARD_LIST.find(w => w.id === id);
      if (foundWard) {
        this.ward = { ...foundWard };
      } else {
        this.ward = { id: id };
      }
    }
  }

  saveChanges() {
    console.log('Updating ward data:', this.ward);
  }

  onFloorChange() {
    const selectedFloor = this.floors.find(f => f.id === this.ward.FloorID);
    if (selectedFloor && selectedFloor.Department) {
      this.ward.Department = selectedFloor.Department;
      // Also try to find matching DepartmentID if possible
      const dept = this.departments.find(d => d.Name === selectedFloor.Department);
      if (dept) {
        this.ward.DepartmentID = dept.id;
      }
    }
  }
}
