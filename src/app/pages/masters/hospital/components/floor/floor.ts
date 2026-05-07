import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './floor.html',
})
export class Floor implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  floorList: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{floors: any[], hospitalbuilding: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.floors && data.hospitalbuilding) {
          const buildings = data.hospitalbuilding;
          this.floorList = data.floors.map(floor => {
            const building = buildings.find(b => b.id === floor.HospitalBuildingID);
            if (building) {
              floor.HospitalBuildingName = building.Name;
            }
            return floor;
          });
        } else if (data && data.floors) {
          this.floorList = data.floors;
        }
      },
      error: (err) => {
        console.error('Error loading floors from JSON:', err);
      }
    });
  }
  
  getFilteredFloors() {
    let filtered = this.floorList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.floorList.filter(f => 
        (f.FloorNumber && f.FloorNumber.toLowerCase().includes(search)) ||
        (f.FloorName && f.FloorName.toLowerCase().includes(search)) ||
        (f.HospitalBuildingName && f.HospitalBuildingName.toLowerCase().includes(search)) ||
        (f.Accessibility && f.Accessibility.toLowerCase().includes(search)) ||
        (f.FrontDeskStaffName && f.FrontDeskStaffName.toLowerCase().includes(search)) ||
        (f.BranchName && f.BranchName.toLowerCase().includes(search)) ||
        (f.Department && f.Department.toString().toLowerCase().includes(search))
      );
    }
    return filtered;
  }

  getPaginatedFloors() {
    const filtered = this.getFilteredFloors();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredFloors().length / this.itemsPerPage);
  }
}