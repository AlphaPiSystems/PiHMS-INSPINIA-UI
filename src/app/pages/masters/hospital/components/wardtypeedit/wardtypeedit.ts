import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { WARDTYPE_LIST } from '../wardtype/hospital-data';
import { DEPARTMENT_LIST } from '../../../departments/components/department/department-data';

@Component({
  selector: 'app-wardtypeedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './wardtypeedit.html',
})
export class WardTypeEdit implements OnInit {
  wardType: any = {};
  
  branches = ['Main Branch', 'City Center Branch'];
  departments = DEPARTMENT_LIST;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = WARDTYPE_LIST.find(wt => wt.id === id);
        if (found) {
          this.wardType = { ...found };
        } else {
          this.router.navigate(['/wardtype/wardtypelist']);
        }
      }
    });
  }

  saveChanges() {
    console.log('Saving updated ward type data:', this.wardType);
    this.router.navigate(['/wardtype/wardtypelist']);
  }
}
