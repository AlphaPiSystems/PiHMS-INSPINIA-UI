import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SurgeryType } from '../../types';

@Component({
  selector: 'app-surgeryedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './surgeryedit.html',
})
export class SurgeryEdit implements OnInit {
  surgery: SurgeryType = {
    id: 0,
    Name: '',
    Description: '',
    BranchID: null,
    DepartmentID: null,
    CreatedStaffID: 1,
    CreatedDateTime: '',
    UpdatedStaffID: 1,
    UpdatedDateTime: '',
    IsRowDeleted: 'N',
    Status: 'Active'
  };

  departments: any[] = [];
  branches: any[] = [];

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
        
        if (data.surgery) {
          this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
              const found = data.surgery.find((i: any) => i.id === id);
              if (found) {
                this.surgery = { ...found };
              }
            }
          });
        }
      }
    });
  }

  save() {
    console.log('Updating surgery:', this.surgery);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
