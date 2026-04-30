import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hospitalbuildingadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './hospitalbuildingadd.html',
})
export class HospitalBuildingAdd implements OnInit {
  building: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.building = {
      id: null,
      Name: '',
      ShortName: '',
      RegisteredName: '',
      ApplicationType: '',
      NameDisplayOption: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
      PostalCode: '',
      PhonePrimary: '',
      PhoneSecondary: '',
      Email: '',
      URL: ''
    };
  }

  saveChanges() {
    console.log('Saving hospital building data:', this.building);
  }
}
