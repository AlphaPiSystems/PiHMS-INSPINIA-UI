import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { STAFF_LIST } from '../floor/hospital-data';
import { DEPARTMENT_LIST } from '../../../../masters/departments/components/department/department-data';

@Component({
  selector: 'app-flooredit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './flooredit.html',
})
export class FloorEdit implements OnInit {
  floor: any = {};
  departmentList = DEPARTMENT_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingFloor = STAFF_LIST.find(f => f.id === id);
      if (existingFloor) {
        this.floor = { ...existingFloor };
      } else {
        // Handle floor not found
        this.floor = { id: id };
      }
    }
  }

  saveChanges() {
    console.log('Saving floor data:', this.floor);
  }
}