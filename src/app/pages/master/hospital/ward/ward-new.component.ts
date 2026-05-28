import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ward-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-new.component.html',
})
export class WardNewComponent {
  ward: any = {
    id: '',
    WardNumber: '',
    Name: '',
    Description: '',
    FloorID: null,
    WardTypeID: '',
    PhoneNumber: '',
    ExtensionNumber: '',
    BranchID: null,
    DepartmentID: null,
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveWard() {
    console.log('Ward saved:', this.ward);
    this.router.navigate(['/master/hospital/ward-list']);
  }
}
