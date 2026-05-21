import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

@Component({
  selector: 'app-wardtypeview',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardtypeview.html',
})
export class WardTypeView implements OnInit {
  wardType: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = DEPARTMENT_LIST;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.http.get<{wardtype: any[]}>('assets/data/db.json').subscribe({
          next: (data) => {
            if (data && data.wardtype) {
              const found = data.wardtype.find(wt => wt.id == id);
              if (found) {
                this.wardType = { ...found };
              } else {
                this.router.navigate(['/wardtype/wardtypelist']);
              }
            }
          },
          error: (err) => {
            console.error('Error loading ward type details:', err);
          }
        });
      }
    });
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
  saveChanges() {}
}
