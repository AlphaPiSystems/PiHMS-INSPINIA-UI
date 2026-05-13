import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-bill-item-add',
    standalone: true,
    imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
    templateUrl: './billitemadd.html',
    styleUrls: ['./billitemadd.scss']
})
export class BillItemAdd implements OnInit {

  billItem: any = {
    Name: '',
    ShortName: '',
    Code: '',
    Description: '',
    Type: '',
    TypeID: null,
    IsDepricated: 'N',
    IsVariedPrice: 'N',
    DefaultPrice: 0,
    BranchID: 1,
    DepartmentID: 1,
    CreatedStaffID: 1,
    IsRowDeleted: 'N'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submitting Bill Item:', this.billItem);
    // Mock success
    alert('Bill Item added successfully (Mock)');
  }
}
