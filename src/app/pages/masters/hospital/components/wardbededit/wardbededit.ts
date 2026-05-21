import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

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
  wards: any[] = [];
  occupancyStatuses = ['Allocated', 'Available'];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.http.get<{wardbed: any[], ward: any[]}>('assets/data/db.json').subscribe({
          next: (data) => {
            if (data) {
              if (data.ward) this.wards = data.ward;
              if (data.wardbed) {
                const found = data.wardbed.find(wb => wb.id == id);
                if (found) {
                  this.wardBed = { ...found };
                } else {
                  this.router.navigate(['/wardbed/wardbedlist']);
                }
              }
            }
          },
          error: (err) => {
            console.error('Error loading ward bed details for edit:', err);
          }
        });
      }
    });
  }

  saveChanges() {
    console.log('Saving updated ward bed data:', this.wardBed);
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
