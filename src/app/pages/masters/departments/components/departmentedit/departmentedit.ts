import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DepartmentService } from '../../../../../core/services/department.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-departmentedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './departmentedit.html',
})
export class DepartmentEdit implements OnInit {
  department: any = {};
  branches: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Load branches from master data
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data && data.hospitalbuilding) {
        this.branches = data.hospitalbuilding;
      }
    });

    const stateDept = history.state.department;
    if (stateDept) {
      this.department = { ...stateDept };
    } else {
      this.router.navigate(['/department/departmentlist']);
    }
  }

  saveChanges() {
    this.department.UpdatedDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log('Preparing payload for updating department:', this.department);
    
    // For now, we'll just go back as we're using a static store
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
