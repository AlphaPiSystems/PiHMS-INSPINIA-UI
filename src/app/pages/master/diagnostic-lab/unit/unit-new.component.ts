import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unit-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './unit-new.component.html',
})
export class UnitNewComponent {
  unit: any = {
    Name: '',
    FullName: '',
    DisplayName: '',
    Description: '',
    DepartmentName: '',
    Status: 'Active',
    BranchName: 'Main Branch'
  };

  constructor(private router: Router) {}

  saveUnit() {
    console.log('Unit saved:', this.unit);
    this.router.navigate(['/master/diagnostic-lab/units-list']);
  }
}
