import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stateadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './stateadd.html',
})
export class StateAdd implements OnInit {
  state: any = {};
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.state = {
      id: null,
      Name: '',
      CountryName: '',
      BranchName: 'Main Branch',
      DepartmentName: 'Bio Chemistry'
    };
  }

  saveChanges() {
    console.log('Saving state data:', this.state);
  }
}
