import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-billitemview',
    standalone: true,
    imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
    templateUrl: './billitemview.html',
    styleUrls: ['./billitemedit.scss']
})
export class BillItemView implements OnInit {

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
    UpdatedStaffID: 1,
    IsRowDeleted: 'N'
  };

  itemId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  , private location: Location) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.loadItemData();
    }
  }

  loadItemData() {
    this.http.get<{ bill_item: any[] }>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.bill_item) {
          const item = data.bill_item.find(i => i.id === Number(this.itemId));
          if (item) {
            this.billItem = { ...item };
          }
        }
      }
    });
  }

  onSubmit() {
    console.log('Updating Bill Item:', this.billItem);
    alert('Bill Item updated successfully (Mock)');
  }
}
