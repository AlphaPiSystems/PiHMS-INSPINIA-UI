import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InstrumentType } from '../../types';

@Component({
  selector: 'app-instrumentadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './instrumentadd.html',
})
export class InstrumentAdd implements OnInit {
  instrument: InstrumentType = {
    id: '',
    InstrumentationName: '',
    BranchName: 'Main Branch',
    DepartmentName: 'General',
    CreatedStaffID: '1',
    CreatedDateTime: null,
    UpdatedStaffID: null,
    UpdatedDateTime: null,
    IsRowDeleted: 'N'
  };

  departments: any[] = [];
  branches: any[] = [];

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }
      }
    });
  }

  save() {
    console.log('Saving instrument:', this.instrument);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
