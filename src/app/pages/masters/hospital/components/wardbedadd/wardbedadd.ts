import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';
import { WARD_LIST } from '../ward/ward-data';

@Component({
  selector: 'app-wardbedadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardbedadd.html',
})
export class WardBedAdd implements OnInit {
  wardBed: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = DEPARTMENT_LIST;
  wards = WARD_LIST;
  occupancyStatuses = ['Allocated', 'Available'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.wardBed = {
      id: null,
      BedNumber: '',
      Description: '',
      BranchName: '',
      DepartmentName: '',
      WardName: '',
      OccupancyStatus: 'Available'
    };
  }

  saveChanges() {
    console.log('Saving ward bed data:', this.wardBed);
  }

  onWardChange() {
    const selectedWard = this.wards.find(w => w.Name === this.wardBed.WardName);
    if (selectedWard) {
      if (selectedWard.Department) {
        this.wardBed.DepartmentName = selectedWard.Department;
      }
      if (selectedWard.FloorName) {
        this.wardBed.FloorName = selectedWard.FloorName;
      }
    }
  }
}
