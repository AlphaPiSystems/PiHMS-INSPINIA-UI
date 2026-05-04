import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { WARDBED_LIST } from '../wardbed/hospital-data';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';
import { WARD_LIST } from '../ward/ward-data';

@Component({
  selector: 'app-wardbededit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardbededit.html',
})
export class WardBedEdit implements OnInit {
  wardBed: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = DEPARTMENT_LIST;
  wards = WARD_LIST;
  occupancyStatuses = ['Allocated', 'Available'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = WARDBED_LIST.find(wb => wb.id === id);
        if (found) {
          // Clone the object so we don't mutate the original array
          this.wardBed = { ...found };
        } else {
          // Handle not found
          this.router.navigate(['/wardbed/wardbedlist']);
        }
      }
    });
  }

  saveChanges() {
    console.log('Saving updated ward bed data:', this.wardBed);
    // In a real application, you'd send an API request here.
    // For now, let's navigate back to the list
    this.router.navigate(['/wardbed/wardbedlist']);
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
