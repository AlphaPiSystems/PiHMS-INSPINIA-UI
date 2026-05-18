import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itemadd',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './itemadd.html',
})
export class ItemAdd implements OnInit {
  item: any = {};
  departments: any[] = [];
  branches: any[] = [];
  staffs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
        this.staffs = data.staffs || [];
      }
    });

    this.item = {
      id: null,
      ItemCode: '',
      Name: '',
      Description: '',
      Category: '',
      TypeName: '',
      PhysicalFormName: '',
      StorageFormName: '',
      BuyConsumeMeasuringUnitName: '',
      MinStockForAlert: '',
      AlertStaffName: '',
      BranchID: '1',
      DepartmentID: '1',
      PackSize: 0,
      Qty: 0,
      PackSizeUnits: '',
      ItemType: '',
      StockUnit: '',
      PurchaseUnit: '',
      IssueUnit: '',
      UsageDescription: '',
      ConversionLogic: '',
      IsRowDeleted: 'N'
    };
  }

  saveChanges() {
    console.log('Saving item data:', this.item);
  }
}
