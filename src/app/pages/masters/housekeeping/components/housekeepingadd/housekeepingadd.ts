import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HousekeepingTaskType } from '../../types';

@Component({
  selector: 'app-housekeepingadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './housekeepingadd.html',
})
export class HousekeepingAdd implements OnInit {
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
    CreatedDateTime: new Date().toISOString(),
    UpdatedStaffID: null,
    UpdatedDateTime: null,
    IsRowDeleted: 'N'
  };

  departments: any[] = [];
  branches: any[] = [];
  categories: string[] = ['Cleaning', 'Maintenance', 'Laundry', 'Sanitization', 'Waste Management'];

  constructor(private location: Location, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });
  }

  save() {
    console.log('Saving task:', this.task);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
