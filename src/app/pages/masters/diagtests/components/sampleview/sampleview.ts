import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sampleview',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './sampleview.html',
})
export class SampleView implements OnInit {
  sample: any = {};
  sampleForms = ['Liquid', 'Solid', 'Semi-solid', 'Gas'];
  containers = ['Plain Tube', 'EDTA Tube', 'Citrate Tube', 'Heparin Tube', 'Urine Container', '24H Urine Jar', 'Sterile Container', 'Sputum Cup', 'Sterile Tube', 'CSF Tube', 'Swab Stick', 'Glass Slide', 'Formalin Jar', 'Stool Container'];
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.departments) {
          this.departments = data.departments;
        }
        if (data.hospitalbuilding) {
          this.branches = data.hospitalbuilding;
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.sample) {
          const found = data.sample.find((s: any) => s.id == id);
          if (found) {
            this.sample = { ...found };
          }
        }
      }
    });
  }

  back() { this.location.back(); }
  navigateToEdit() { this.location.back(); }
  saveChanges() {}
}
