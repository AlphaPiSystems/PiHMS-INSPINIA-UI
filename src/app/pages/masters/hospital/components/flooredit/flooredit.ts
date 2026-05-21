import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
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
  buildings: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{floors: any[], hospitalbuilding: any[]}>('assets/data/db.json').subscribe({
        next: (data) => {
          if (data) {
            if (data.hospitalbuilding) {
              this.buildings = data.hospitalbuilding;
            }
            if (data.floors) {
              const found = data.floors.find(f => f.id == id);
              if (found) {
                this.floor = { ...found };
              } else {
                this.floor = { id: id };
              }
            }
          }
        },
        error: (err) => {
          console.error('Error loading floor details for edit:', err);
        }
      });
    }
  }

  saveChanges() {
    console.log('Saving floor data:', this.floor);
    this.router.navigate(['/floor/floorlist']);
  }
}