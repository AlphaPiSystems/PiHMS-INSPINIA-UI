import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { BUILDING_LIST } from '../hospitalbuilding/hospitalbuilding-data';

@Component({
  selector: 'app-hospitalbuildingedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './hospitalbuildingedit.html',
})
export class HospitalBuildingEdit implements OnInit {
  building: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingBuilding = BUILDING_LIST.find(b => b.id === id);
      if (existingBuilding) {
        this.building = { ...existingBuilding };
      } else {
        // Handle building not found
        this.building = { id: id };
      }
    }
  }

  saveChanges() {
    console.log('Updating hospital building data:', this.building);
  }
}
