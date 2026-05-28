import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ward-bed-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-bed-new.component.html',
})
export class WardBedNewComponent {
  wardBed: any = {
    id: '',
    BedNumber: '',
    Description: '',
    BranchName: '',
    DepartmentName: '',
    WardName: '',
    FloorID: null,
    FloorName: '',
    OccupancyStatus: 'Available'
  };

  constructor(private router: Router) {}

  saveWardBed() {
    console.log('Ward Bed saved:', this.wardBed);
    this.router.navigate(['/master/hospital/ward-bed-list']);
  }
}
