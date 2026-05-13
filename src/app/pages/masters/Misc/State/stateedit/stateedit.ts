import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stateedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './stateedit.html',
})
export class StateEdit implements OnInit {
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

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.state) {
          const found = data.state.find((s: any) => s.id == id);
          if (found) {
            this.state = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating state data:', this.state);
  }
}
