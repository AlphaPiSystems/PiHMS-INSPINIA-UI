import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postalcodeadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './postalcodeadd.html',
})
export class PostalCodeAdd implements OnInit {
  postalCode: any = {};
  cities: any[] = [];
  districts: any[] = [];
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.cities = data.city || [];
        this.districts = data.district || [];
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.postalCode = {
      id: null,
      PostalCode: '',
      PostOfficeName: '',
      AreaName: '',
      CityName: '',
      DistrictName: '',
      StateName: '',
      CountryName: '',
      BranchName: 'Main Branch',
      DepartmentName: 'Bio Chemistry'
    };
  }

  saveChanges() {
    console.log('Saving postal code data:', this.postalCode);
  }
}
