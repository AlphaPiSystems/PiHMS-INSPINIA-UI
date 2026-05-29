import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './country-new.component.html',
})
export class CountryNewComponent {
  country: any = {
    id: null,
    Name: '',
    IsSupported: 'Y',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveCountry() {
    console.log('Country saved:', this.country);
    this.router.navigate(['/master/misc/country-list']);
  }
}
