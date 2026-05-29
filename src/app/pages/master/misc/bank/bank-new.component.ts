import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bank-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bank-new.component.html',
})
export class BankNewComponent {
  bankData: any = {
    id: null,
    Name: '',
    Address: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router) {}

  saveBank() {
    console.log('Bank saved:', this.bankData);
    this.router.navigate(['/master/misc/bank-list']);
  }
}
