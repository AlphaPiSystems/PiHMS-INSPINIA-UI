import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FLOOR_DATA } from './floor-list.component';

@Component({
  selector: 'app-floor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './floor-edit.component.html',
})
export class FloorEditComponent implements OnInit {
  floorId: string | null = null;
  floor: any = {
    FloorNumber: '',
    FloorName: '',
    HospitalBuildingID: null,
    Accessibility: '',
    FrontDeskPresent: 'N',
    FrontDeskNumber: '',
    FrontDeskStaffName: '',
    BranchID: null,
    DepartmentID: null
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.floorId = params['id'];
        this.loadFloor(this.floorId);
      }
    });
  }

  loadFloor(id: string | null): void {
    console.log('Loading floor with id:', id);
    if (id) {
      const found = FLOOR_DATA.find(f => f.id === id);
      if (found) {
        this.floor = { ...found };
      }
    }
  }

  updateFloor(): void {
    console.log('Floor updated:', this.floor);
    this.router.navigate(['/master/hospital/floor-list']);
  }
}
