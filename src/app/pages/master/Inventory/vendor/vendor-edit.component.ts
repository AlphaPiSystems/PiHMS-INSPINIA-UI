import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { VENDOR_DATA } from './vendor-list.component';

@Component({
  selector: 'app-vendor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vendor-edit.component.html',
})
export class VendorEditComponent implements OnInit {
  vendorId: string | null = null;
  vendorData: any = {
    id: null,
    Name: '',
    Address: '',
    City: '',
    State: '',
    PostalCode: '',
    ContactPersonName: '',
    ContactPersonPhone: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.vendorId = params['id'];
        this.loadVendor(this.vendorId);
      }
    });
  }

  loadVendor(id: string | null): void {
    if (id) {
      const found = VENDOR_DATA.find(c => c.id === Number(id));
      if (found) {
        this.vendorData = { ...found };
      }
    }
  }

  updateVendor(): void {
    console.log('Vendor updated:', this.vendorData);
    this.router.navigate(['/master/misc/vendor-list']);
  }
}
