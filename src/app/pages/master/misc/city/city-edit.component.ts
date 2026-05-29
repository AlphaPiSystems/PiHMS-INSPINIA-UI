import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CITY_DATA } from './city-list.component';

@Component({
  selector: 'app-city-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './city-edit.component.html',
})
export class CityEditComponent implements OnInit {
  cityId: string | null = null;
  cityData: any = {
    id: null,
    Name: '',
    DistrictName: '',
    StateName: '',
    CountryName: '',
    Type: 'Urban',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.cityId = params['id'];
        this.loadCity(this.cityId);
      }
    });
  }

  loadCity(id: string | null): void {
    if (id) {
      const found = CITY_DATA.find(c => c.id === Number(id));
      if (found) {
        this.cityData = { ...found };
      }
    }
  }

  updateCity(): void {
    console.log('City updated:', this.cityData);
    this.router.navigate(['/master/misc/city-list']);
  }
}
