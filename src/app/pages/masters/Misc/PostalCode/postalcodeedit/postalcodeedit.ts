import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postalcodeedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './postalcodeedit.html',
})
export class PostalCodeEdit implements OnInit {
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

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.postalcode) {
          const found = data.postalcode.find((pc: any) => pc.id == id);
          if (found) {
            this.postalCode = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating postal code data:', this.postalCode);
  }
}
