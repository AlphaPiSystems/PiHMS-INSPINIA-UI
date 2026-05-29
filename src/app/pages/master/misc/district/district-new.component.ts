import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-district-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './district-new.component.html',
})
export class DistrictNewComponent {
  districtData: any = {
    id: null,
    Name: '',
    StateName: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveDistrict() {
    console.log('District saved:', this.districtData);
    this.router.navigate(['/master/misc/district-list']);
  }
}
