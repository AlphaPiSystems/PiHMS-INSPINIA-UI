import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-floor-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './floor-new.component.html',
})
export class FloorNewComponent {
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

  constructor(private router: Router) {}

  saveFloor() {
    console.log('Floor saved:', this.floor);
    this.router.navigate(['/master/hospital/floor-list']);
  }
}
