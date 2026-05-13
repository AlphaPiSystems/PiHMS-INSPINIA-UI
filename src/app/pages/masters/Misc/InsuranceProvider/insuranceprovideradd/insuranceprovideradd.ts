import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insuranceprovideradd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './insuranceprovideradd.html',
})
export class InsuranceProviderAdd implements OnInit {
  provider: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.provider = {
      id: null,
      Name: '',
      Address: '',
      BranchName: 'Main Branch',
      DepartmentName: 'Bio Chemistry'
    };
  }

  saveChanges() {
    console.log('Saving insurance provider data:', this.provider);
  }
}
