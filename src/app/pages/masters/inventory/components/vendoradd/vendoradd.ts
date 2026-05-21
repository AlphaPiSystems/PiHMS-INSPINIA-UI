import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

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

  isFormValid(): boolean {
    return !!(
      this.vendor.Name?.trim() &&
      this.vendor.ContactPersonName?.trim() &&
      this.vendor.ContactPersonPhone?.trim() &&
      this.vendor.Address?.trim() &&
      this.vendor.City?.trim() &&
      this.vendor.State?.trim() &&
      this.vendor.PostalCode?.trim() &&
      this.vendor.Country?.trim() &&
      this.vendor.BranchID &&
      this.vendor.DepartmentID
    );
  }

  saveChanges() {
    console.log('Saving vendor data:', this.vendor);
    alert('Vendor added successfully (Mock)');
    this.router.navigate(['/inventory/vendor/vendorlist']);
  }
}
