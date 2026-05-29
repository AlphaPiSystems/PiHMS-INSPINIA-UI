import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './city-new.component.html',
})
export class CityNewComponent {
  cityData: any = {
    id: null,
    Name: '',
    DistrictName: '',
    StateName: '',
    CountryName: '',
    Type: 'Urban',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveCity() {
    console.log('City saved:', this.cityData);
    this.router.navigate(['/master/misc/city-list']);
  }
}
