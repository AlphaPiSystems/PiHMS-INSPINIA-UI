import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideCalendar } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';
import { PharmacyType } from '../../types';

@Component({
  selector: 'app-pharmacyedit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageTitleComponent, LucideAngularModule, NgxDaterangepickerBootstrapDirective],
  templateUrl: './pharmacyedit.html',
})
export class PharmacyEdit implements OnInit {
  protected readonly LucideCalendar = LucideCalendar;

  item: PharmacyType = {
    id: 0,
    ItemName: '',
    ItemCode: '',
    BatchNum: '',
    ExpiryDate: null,
    DosageForm: '',
    ConstituentsPerUnit: '',
    Manufacturer: '',
    Distributor: '',
    BranchID: null,
    DepartmentID: null,
    CreatedStaffID: 1,
    CreatedDateTime: null,
    UpdatedStaffID: 1,
    UpdatedDateTime: new Date().toISOString(),
    IsRowDeleted: 'N'
  };

  branches: any[] = [];
  departments: any[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['item']) {
      this.item = { ...navigation.extras.state['item'] };
    }
  }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.branches = data.hospitalbuilding || [];
        this.departments = data.departments || [];
      }
    });
  }

  saveChanges() {
    console.log('Updating pharmacy item:', this.item);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
