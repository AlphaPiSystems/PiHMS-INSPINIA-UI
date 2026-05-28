import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { WARD_TYPE_DATA } from './ward-type-list.component';

@Component({
  selector: 'app-ward-type-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-type-edit.component.html',
})
export class WardTypeEditComponent implements OnInit {
  wardTypeId: string | null = null;
  wardType: any = {
    id: '',
    Type: '',
    Description: '',
    BranchName: '',
    DepartmentName: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.wardTypeId = params['id'];
        this.loadWardType(this.wardTypeId);
      }
    });
  }

  loadWardType(id: string | null): void {
    console.log('Loading ward type with id:', id);
    if (id) {
      const found = WARD_TYPE_DATA.find(w => w.id === id);
      if (found) {
        this.wardType = { ...found };
      }
    }
  }

  updateWardType(): void {
    console.log('Ward Type updated:', this.wardType);
    this.router.navigate(['/master/hospital/ward-type-list']);
  }
}
