import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendorview',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './vendorview.html',
})
export class VendorView implements OnInit {
  vendor: any = {};
  departments: any[] = [];
  branches: any[] = [];
  vendorId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        if (data.vendors) {
          const found = data.vendors.find((v: any) => v.id == this.vendorId);
          if (found) {
            this.vendor = { ...found };
          }
        }
      }
    });
  }

  back() {
    this.location.back();
  }
}
