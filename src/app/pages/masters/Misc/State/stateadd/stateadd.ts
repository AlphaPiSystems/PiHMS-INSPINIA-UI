import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

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
      BranchName: '',
      DepartmentName: '',
      Status: 'Active'
    };
  }

  saveChanges(form?: any) {
    if (form && form.invalid) {
      return;
    }
    console.log('Saving state data:', this.state);
    this.router.navigate(['/misc/state/statelist']);
  }
}
