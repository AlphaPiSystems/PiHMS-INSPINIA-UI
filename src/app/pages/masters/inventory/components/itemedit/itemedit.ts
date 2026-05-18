import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itemedit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: '../itemadd/itemadd.html', // Reuse add template
})
export class ItemEdit implements OnInit {
  item: any = {};
  departments: any[] = [];
  branches: any[] = [];
  staffs: any[] = [];
  itemId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
        this.staffs = data.staffs || [];
        
        if (data.inventory_items) {
          const found = data.inventory_items.find((i: any) => i.id == this.itemId);
          if (found) {
            this.item = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating item data:', this.item);
  }
}
