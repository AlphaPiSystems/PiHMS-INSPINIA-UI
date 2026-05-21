import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospitalbuildingview',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './hospitalbuildingview.html',
})
export class HospitalBuildingView implements OnInit {
  building: any = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{hospitalbuilding: any[]}>('assets/data/db.json').subscribe({
        next: (data) => {
          if (data && data.hospitalbuilding) {
            const found = data.hospitalbuilding.find(b => b.id == id);
            if (found) {
              this.building = { ...found };
            } else {
              this.building = { id: id };
            }
          }
        },
        error: (err) => {
          console.error('Error loading building detail:', err);
        }
      });
    }
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
}
