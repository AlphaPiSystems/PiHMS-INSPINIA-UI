import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cityadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './cityadd.html',
})
export class CityAdd implements OnInit {
  city: any = {};
  districts: any[] = [];
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.districts = data.district || [];
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.city = {
      id: null,
      Name: '',
      DistrictName: '',
      StateName: '',
      CountryName: '',
      Type: '',
      BranchName: '',
      DepartmentName: ''
    };
  }

  saveChanges() {
    console.log('Saving city data:', this.city);
  }
}
