import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ITEM_DATA } from './item-list.component';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-edit.component.html',
})
export class ItemEditComponent implements OnInit {
  itemId: string | null = null;
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.itemId = params['id'];
        this.loadItem(this.itemId);
      }
    });
  }

  loadItem(id: string | null): void {
    if (id) {
      const found = ITEM_DATA.find(c => c.id === Number(id));
      if (found) {
        this.itemData = { ...found };
      }
    }
  }

  updateItem(): void {
    console.log('Item updated:', this.itemData);
    this.router.navigate(['/master/misc/item-list']);
  }
}
