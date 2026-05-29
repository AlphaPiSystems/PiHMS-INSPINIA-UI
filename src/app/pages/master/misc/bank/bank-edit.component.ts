import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { BANK_DATA } from './bank-list.component';

@Component({
  selector: 'app-bank-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bank-edit.component.html',
})
export class BankEditComponent implements OnInit {
  bankId: string | null = null;
  bankData: any = {
    id: null,
    Name: '',
    Address: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.bankId = params['id'];
        this.loadBank(this.bankId);
      }
    });
  }

  loadBank(id: string | null): void {
    if (id) {
      const found = BANK_DATA.find(c => c.id === Number(id));
      if (found) {
        this.bankData = { ...found };
      }
    }
  }

  updateBank(): void {
    console.log('Bank updated:', this.bankData);
    this.router.navigate(['/master/misc/bank-list']);
  }
}
