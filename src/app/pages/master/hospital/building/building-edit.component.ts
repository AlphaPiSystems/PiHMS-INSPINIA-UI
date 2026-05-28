import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { BUILDING_DATA } from './building-list.component';

@Component({
  selector: 'app-building-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './building-edit.component.html',
})
export class BuildingEditComponent implements OnInit {
  buildingId: number | null = null;
  building: any = {
    Name: '',
    ShortName: '',
    RegisteredName: '',
    ApplicationType: '',
    Address: '',
    City: '',
    PhoneSecondary: '',
    Email: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.buildingId = +params['id'];
        this.loadBuilding(this.buildingId);
      }
    });
  }

  loadBuilding(id: number): void {
    console.log('Loading building with id:', id);
    const found = BUILDING_DATA.find(b => b.id === id);
    if (found) {
      this.building = { ...found };
    }
  }

  updateBuilding(): void {
    console.log('Building updated:', this.building);
    this.router.navigate(['/master/hospital/building-list']);
  }
}
