import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vendor-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vendor-new.component.html',
})
export class VendorNewComponent {
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

  constructor(private router: Router) {}

  saveVendor() {
    console.log('Vendor saved:', this.vendorData);
    this.router.navigate(['/master/misc/vendor-list']);
  }
}
