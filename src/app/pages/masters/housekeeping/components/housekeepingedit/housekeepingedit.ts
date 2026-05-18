import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HousekeepingTaskType } from '../../types';

@Component({
  selector: 'app-housekeepingedit',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './housekeepingedit.html',
})
export class HousekeepingEdit implements OnInit {
  task: HousekeepingTaskType = {
    id: 0,
    TaskName: '',
    Descriptions: '',
    Duration: '',
    Category: '',
    Notes: '',
    BranchID: null,
    DepartmentID: null,
    CreatedStaffID: 1,
    CreatedDateTime: '',
    UpdatedStaffID: 1,
    UpdatedDateTime: new Date().toISOString(),
    IsRowDeleted: 'N'
  };

  departments: any[] = [];
  branches: any[] = [];
  categories: string[] = ['Cleaning', 'Maintenance', 'Laundry', 'Sanitization', 'Waste Management'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
        
        if (data.housekeeping_tasks) {
          this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
              const found = data.housekeeping_tasks.find((i: any) => i.id === id);
              if (found) {
                this.task = { ...found };
                this.task.UpdatedDateTime = new Date().toISOString();
                this.task.UpdatedStaffID = 1;
              }
            }
          });
        }
      }
    });
  }

  save() {
    console.log('Updating task:', this.task);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
