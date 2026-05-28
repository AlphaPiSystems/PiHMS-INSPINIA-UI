import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { WARD_DATA } from './ward-list.component';

@Component({
  selector: 'app-ward-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ward-edit.component.html',
})
export class WardEditComponent implements OnInit {
  wardId: string | null = null;
  ward: any = {
    id: '',
    WardNumber: '',
    Name: '',
    Description: '',
    FloorID: null,
    WardTypeID: '',
    PhoneNumber: '',
    ExtensionNumber: '',
    BranchID: null,
    DepartmentID: null,
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.wardId = params['id'];
        this.loadWard(this.wardId);
      }
    });
  }

  loadWard(id: string | null): void {
    console.log('Loading ward with id:', id);
    if (id) {
      const found = WARD_DATA.find(w => w.id === id);
      if (found) {
        this.ward = { ...found };
      }
    }
  }

  updateWard(): void {
    console.log('Ward updated:', this.ward);
    this.router.navigate(['/master/hospital/ward-list']);
  }
}
