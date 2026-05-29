import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-state-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './state-new.component.html',
})
export class StateNewComponent {
  stateData: any = {
    id: null,
    Name: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveState() {
    console.log('State saved:', this.stateData);
    this.router.navigate(['/master/misc/state-list']);
  }
}
