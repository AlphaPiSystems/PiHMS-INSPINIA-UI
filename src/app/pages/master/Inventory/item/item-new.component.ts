import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-new.component.html',
})
export class ItemNewComponent {
  itemData: any = {
    id: null,
    Name: '',
    Description: '',
    Category: '',
    TypeName: '',
    PhysicalFormName: '',
    ItemType: '',
    IsRowDeleted: 'N'
  };

  constructor(private router: Router) {}

  saveItem() {
    console.log('Item saved:', this.itemData);
    this.router.navigate(['/master/misc/item-list']);
  }
}
