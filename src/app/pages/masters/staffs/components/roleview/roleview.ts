import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-roleview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageTitleComponent, LucideAngularModule],
  templateUrl: './roleview.html',
})
export class RoleView implements OnInit {
  role: any = {};
  roleId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.roleId = parseInt(idParam, 10);
      this.loadRoleData();
    }
  }

  loadRoleData() {
    this.http.get<{staffRoles: any[]}>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.staffRoles) {
          const foundRole = data.staffRoles.find(r => (r.id === this.roleId || r.ID === this.roleId));
          if (foundRole) {
            this.role = { ...foundRole };
          }
        }
      },
      error: (err) => {
        console.error('Error loading role from JSON:', err);
      }
    });
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
  saveChanges() {}
}
