import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { WARD_BED_DATA } from './ward-bed-list.component';

@Component({
  selector: 'app-ward-bed-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-bed-edit.component.html',
})
export class WardBedEditComponent implements OnInit {
  wardBedId: string | null = null;
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.wardBedId = params['id'];
        this.loadWardBed(this.wardBedId);
      }
    });
  }

  loadWardBed(id: string | null): void {
    console.log('Loading ward bed with id:', id);
    if (id) {
      const found = WARD_BED_DATA.find(w => w.id === id);
      if (found) {
        this.wardBed = { ...found };
      }
    }
  }

  updateWardBed(): void {
    console.log('Ward Bed updated:', this.wardBed);
    this.router.navigate(['/master/hospital/ward-bed-list']);
  }
}
