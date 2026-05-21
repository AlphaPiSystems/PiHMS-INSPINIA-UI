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
  submitted: boolean = false; // Track if Save Changes was clicked

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
    this.submitted = true; // Mark form as submitted

    // Validate mandatory fields
    if (!this.item?.Name?.trim() || !this.item?.Category?.trim() || !this.item?.ItemType) {
      console.warn('Please fill in all mandatory fields marked with an asterisk (*)');
      return; // Stop saving if validation fails
    }

    console.log('Updating item data:', this.item);
    // TODO: Call API/service to actually save the item
  }
}