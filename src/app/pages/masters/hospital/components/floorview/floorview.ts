import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { DEPARTMENT_LIST } from '../../../../masters/departments/components/department/department-data';

@Component({
  selector: 'app-floorview',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './floorview.html',
})
export class FloorView implements OnInit {
  floor: any = {};
  departmentList = DEPARTMENT_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{floors: any[]}>('assets/data/db.json').subscribe({
        next: (data) => {
          if (data && data.floors) {
            const found = data.floors.find(f => f.id == id);
            if (found) {
              this.floor = { ...found };
            } else {
              this.floor = { id: id };
            }
          }
        },
        error: (err) => {
          console.error('Error loading floor details:', err);
        }
      });
    }
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
  saveChanges() {}
}