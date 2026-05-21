import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospitalbuildingedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './hospitalbuildingedit.html',
})
export class HospitalBuildingEdit implements OnInit {
  building: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
          console.error('Error loading building details for edit:', err);
        }
      });
    }
  }

  saveChanges() {
    console.log('Updating hospital building data:', this.building);
  }
}
