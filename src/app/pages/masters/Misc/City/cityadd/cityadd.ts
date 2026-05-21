import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

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
      DistrictName: 'Mumbai',
      StateName: 'Maharashtra',
      CountryName: 'India',
      Type: 'Urban',
      BranchName: 'Main Branch',
      DepartmentName: 'Bio Chemistry',
      Status: 'Active'
    };
  }

  saveChanges(form?: any) {
    if (form && form.invalid) {
      return;
    }
    console.log('Saving city data:', this.city);
    this.router.navigate(['/misc/city/citylist']);
  }
}
