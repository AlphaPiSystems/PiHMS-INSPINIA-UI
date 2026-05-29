import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-postal-code-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './postal-code-new.component.html',
})
export class PostalCodeNewComponent {
  postalCodeData: any = {
    id: null,
    PostalCode: '',
    PostOfficeName: '',
    AreaName: '',
    CityName: '',
    DistrictName: '',
    StateName: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  savePostalCode() {
    console.log('Postal Code saved:', this.postalCodeData);
    this.router.navigate(['/master/misc/postal-code-list']);
  }
}
