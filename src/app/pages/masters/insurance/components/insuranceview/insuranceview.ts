import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InsuranceType } from '../../types';

@Component({
  selector: 'app-insuranceview',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './insuranceview.html',
})
export class InsuranceView implements OnInit {
  insurance: InsuranceType = {
    id: 0,
    Name: '',
    Description: '',
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
        
        if (data.insurance) {
          this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
              const found = data.insurance.find((i: any) => i.id === id);
              if (found) {
                this.insurance = { ...found };
                this.insurance.UpdatedDateTime = new Date().toISOString();
                this.insurance.UpdatedStaffID = 1;
              }
            }
          });
        }
      }
    });
  }

  save() {
    console.log('Updating insurance:', this.insurance);
    this.location.back();
  }

  
}
