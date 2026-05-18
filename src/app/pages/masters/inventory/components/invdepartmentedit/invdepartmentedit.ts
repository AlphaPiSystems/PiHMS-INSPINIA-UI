import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inv-departmentedit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: '../invdepartmentadd/invdepartmentadd.html',
})
export class InvDepartmentEdit implements OnInit {
  department: any = {};
  branches: any[] = [];
  hospDepartments: any[] = [];
  deptId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.deptId = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.branches = data.hospitalbuilding || [];
        this.hospDepartments = data.departments || [];
        
        if (data.inventory_departments) {
          const found = data.inventory_departments.find((d: any) => d.id == this.deptId);
          if (found) {
            this.department = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating inventory department data:', this.department);
  }
}
