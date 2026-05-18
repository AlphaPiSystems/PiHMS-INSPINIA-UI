import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-roleadd',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageTitleComponent, LucideAngularModule],
  templateUrl: './roleadd.html',
})
export class RoleAdd implements OnInit {
  role: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.role = {
      ID: null,
      RoleName: '',
      RoleDescription: '',
      BranchID: null,
      DepartmentID: null,
      CreatedStaffID: null,
      CreatedDateTime: new Date().toISOString(),
      UpdatedStaffID: null,
      UpdatedDateTime: null,
      IsRowDeleted: 'N'
    };
  }

  saveChanges() {
    console.log('Saving role data:', this.role);
    // Add logic to save via HttpClient here
    this.router.navigate(['/staff/rolelist']);
  }
}
