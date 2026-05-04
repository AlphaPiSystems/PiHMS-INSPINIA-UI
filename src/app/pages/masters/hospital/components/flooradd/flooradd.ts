import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { DEPARTMENT_LIST } from '../../../../masters/departments/components/department/department-data';


@Component({
  selector: 'app-flooradd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './flooradd.html',
})
export class FloorAdd implements OnInit {
  floor: any = {};
  departmentList = DEPARTMENT_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.floor = {
      id: null,
      FloorNumber: '',
      FloorName: '',
      HospitalBuildingName: '',
      Accessibility: '',
      FrontDeskPresent: 'N',
      FrontDeskNumber: '',
      FrontDeskStaffName: '',
      BranchName: '',
      Department: ''
    };
  }

  saveChanges() {
    console.log('Saving floor data:', this.floor);
  }
}