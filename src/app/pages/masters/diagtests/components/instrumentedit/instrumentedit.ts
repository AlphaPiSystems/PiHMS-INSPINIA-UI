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
  selector: 'app-instrumentedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './instrumentedit.html',
})
export class InstrumentEdit implements OnInit {
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
            
            // Check if existing BranchName and DepartmentName are valid
            if (this.instrument) {
              if (this.branches && !this.branches.some(b => b.Name === this.instrument?.BranchName)) {
                this.instrument.BranchName = '';
              }
              if (this.departments && !this.departments.some(d => d.Name === this.instrument?.DepartmentName)) {
                this.instrument.DepartmentName = '';
              }
            }
          }
        });
      }
    });
  }

  save(form: any) {
    if (form.invalid) {
      return;
    }
    if (this.instrument) {
      console.log('Updating instrument:', this.instrument);
      this.location.back();
    }
  }

  cancel() {
    this.location.back();
  }
}
