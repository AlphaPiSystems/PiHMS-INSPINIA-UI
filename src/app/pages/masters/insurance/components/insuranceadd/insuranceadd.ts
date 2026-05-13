import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InsuranceType } from '../../types';

@Component({
  selector: 'app-insuranceadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './insuranceadd.html',
})
export class InsuranceAdd implements OnInit {
  insurance: InsuranceType = {
    id: 0,
    Name: '',
    Description: '',
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
    console.log('Saving insurance:', this.insurance);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
