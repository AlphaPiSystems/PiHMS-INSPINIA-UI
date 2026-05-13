import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScanType } from '../../types';

@Component({
  selector: 'app-scanedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './scanedit.html',
})
export class ScanEdit implements OnInit {
  scan: ScanType | null = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data && data.scan) {
        this.route.params.subscribe(params => {
          const id = +params['id'];
          if (id) {
            this.scan = data.scan.find((i: any) => i.id === id);
          }
        });
      }
    });
  }

  save() {
    if (this.scan) {
      console.log('Updating scan:', this.scan);
      this.location.back();
    }
  }

  cancel() {
    this.location.back();
  }
}
