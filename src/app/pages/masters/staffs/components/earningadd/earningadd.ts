import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff-earningadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './earningadd.html',
})
export class StaffEarningAdd implements OnInit {
  earning: any = {};
  staffs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
      }
    });

    this.earning = {
      id: null,
      StaffID: '',
      BASIC: 0,
      HRA: 0,
      CA: 0,
      MA: 0,
      VA: 0,
      PB: 0,
      IsRowDeleted: 'N'
    };
  }

  saveChanges() {
    console.log('Saving staff earning data:', this.earning);
  }
}
