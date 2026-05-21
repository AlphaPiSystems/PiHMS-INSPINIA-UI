import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-earningview',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './earningview.html',
})
export class EarningView implements OnInit {
  earning: any = {};
  staffs: any[] = [];
  earningId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.earningId = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
        
        if (data.staff_earnings) {
          const found = data.staff_earnings.find((e: any) => e.id == this.earningId);
          if (found) {
            this.earning = { ...found };
          }
        }
      }
    });
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
  saveChanges() {}
}
