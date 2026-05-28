import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ward-type-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-type-new.component.html',
})
export class WardTypeNewComponent {
  wardType: any = {
    id: '',
    Type: '',
    Description: '',
    BranchName: '',
    DepartmentName: ''
  };

  constructor(private router: Router) {}

  saveWardType() {
    console.log('Ward Type saved:', this.wardType);
    this.router.navigate(['/master/hospital/ward-type-list']);
  }
}
