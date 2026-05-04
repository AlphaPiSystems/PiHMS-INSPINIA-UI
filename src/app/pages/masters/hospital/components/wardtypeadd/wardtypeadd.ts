import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

@Component({
  selector: 'app-wardtypeadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardtypeadd.html',
})
export class WardTypeAdd implements OnInit {
  wardType: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = DEPARTMENT_LIST;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.wardType = {
      id: null,
      Type: '',
      Description: '',
      BranchName: '',
      DepartmentName: ''
    };
  }

  saveChanges() {
    console.log('Saving ward type data:', this.wardType);
  }
}
