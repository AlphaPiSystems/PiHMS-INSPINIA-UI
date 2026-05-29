import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { DISTRICT_DATA } from './district-list.component';

@Component({
  selector: 'app-district-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './district-edit.component.html',
})
export class DistrictEditComponent implements OnInit {
  districtId: string | null = null;
  districtData: any = {
    id: null,
    Name: '',
    StateName: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.districtId = params['id'];
        this.loadDistrict(this.districtId);
      }
    });
  }

  loadDistrict(id: string | null): void {
    if (id) {
      const found = DISTRICT_DATA.find(c => c.id === Number(id));
      if (found) {
        this.districtData = { ...found };
      }
    }
  }

  updateDistrict(): void {
    console.log('District updated:', this.districtData);
    this.router.navigate(['/master/misc/district-list']);
  }
}
