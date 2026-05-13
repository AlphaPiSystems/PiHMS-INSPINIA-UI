import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-districtedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './districtedit.html',
})
export class DistrictEdit implements OnInit {
  district: any = {};
  states: any[] = [];
  countries: any[] = [];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.states = data.state || [];
        this.countries = data.country || [];
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.district) {
          const found = data.district.find((d: any) => d.id == id);
          if (found) {
            this.district = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating district data:', this.district);
  }
}
