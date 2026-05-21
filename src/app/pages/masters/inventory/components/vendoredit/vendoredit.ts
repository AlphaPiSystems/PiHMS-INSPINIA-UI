import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendoredit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: '../vendoradd/vendoradd.html',
})
export class VendorEdit implements OnInit {
  vendor: any = {};
  departments: any[] = [];
  branches: any[] = [];
  vendorId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
        
        if (data.vendors) {
          const found = data.vendors.find((v: any) => v.id == this.vendorId);
          if (found) {
            this.vendor = { ...found };
          }
        }
      }
    });
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
    console.log('Updating vendor data:', this.vendor);
    alert('Vendor updated successfully (Mock)');
    this.router.navigate(['/inventory/vendor/vendorlist']);
  }
}
