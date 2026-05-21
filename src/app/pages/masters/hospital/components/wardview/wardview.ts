import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { WARD_TYPES, STATUS_LIST } from '../ward/ward-data';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

@Component({
  selector: 'app-wardview',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardview.html',
})
export class WardView implements OnInit {
  ward: any = {};
  wardTypes = WARD_TYPES;
  floors: any[] = [];
  buildings: any[] = [];
  departments = DEPARTMENT_LIST;
  statuses = STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ward: any[], floors: any[], hospitalbuilding: any[], wardtype: any[]}>('assets/data/db.json').subscribe({
        next: (data) => {
          if (data) {
            if (data.floors) this.floors = data.floors;
            if (data.hospitalbuilding) this.buildings = data.hospitalbuilding;
            if (data.wardtype) this.wardTypes = data.wardtype;
            
            if (data.ward) {
              const foundWard = data.ward.find(w => w.id == id);
              if (foundWard) {
                this.ward = { ...foundWard };
              } else {
                this.ward = { id: id };
              }
            }
          }
        },
        error: (err) => {
          console.error('Error loading ward details:', err);
        }
      });
    }
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }

  onFloorChange() {
    const selectedFloor = this.floors.find(f => f.id == this.ward.FloorID);
    if (selectedFloor && selectedFloor.Department) {
      this.ward.Department = selectedFloor.Department;
      const dept = this.departments.find(d => d.Name === selectedFloor.Department);
      if (dept) {
        this.ward.DepartmentID = dept.id;
      }
    }
  }
  saveChanges() {}
}
