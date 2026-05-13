import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insuranceprovideredit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './insuranceprovideredit.html',
})
export class InsuranceProviderEdit implements OnInit {
  provider: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.insuranceprovider) {
          const found = data.insuranceprovider.find((p: any) => p.id == id);
          if (found) {
            this.provider = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating insurance provider data:', this.provider);
  }
}
