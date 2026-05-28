import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-building-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './building-new.component.html',
})
export class BuildingNewComponent {
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

  constructor(private router: Router) {}

  saveBuilding() {
    console.log('Building saved:', this.building);
    this.router.navigate(['/master/hospital/building-list']);
  }
}
