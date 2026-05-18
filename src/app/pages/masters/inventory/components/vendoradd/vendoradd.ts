import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendoradd',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './vendoradd.html',
})
export class VendorAdd implements OnInit {
  vendor: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.vendor = {
      id: null,
      Name: '',
      VendorCode: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
      PostalCode: '',
      ContactPersonName: '',
      ContactPersonPhone: '',
      Notes: '',
      BranchID: '1',
      DepartmentID: '1',
      IsRowDeleted: 'N'
    };
  }

  saveChanges() {
    console.log('Saving vendor data:', this.vendor);
  }
}
