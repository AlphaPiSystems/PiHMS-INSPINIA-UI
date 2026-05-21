import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InstrumentType } from '../../types';

@Component({
  selector: 'app-instrumentview',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './instrumentview.html',
})
export class InstrumentView implements OnInit {
  instrument: InstrumentType | null = null;
  departments: any[] = [];
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }
        
        this.route.params.subscribe(params => {
          const id = params['id'];
          if (id && data.instrument) {
            this.instrument = data.instrument.find((i: any) => i.id === id);
          }
        });
      }
    });
  }

  save() {
    if (this.instrument) {
      console.log('Updating instrument:', this.instrument);
      this.location.back();
    }
  }

  
}
