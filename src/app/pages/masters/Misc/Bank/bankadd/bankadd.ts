import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bankadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './bankadd.html',
})
export class BankAdd implements OnInit {
  bank: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];
      }
    });

    this.bank = {
      id: null,
      Name: '',
      Code: '',
      Phone: '',
      Email: '',
      Address: '',
      BranchName: 'Main Branch',
      DepartmentName: 'Bio Chemistry',
      Status: 'Active'
    };
  }

  isLettersOnly(val: string): boolean {
    if (!val) return true;
    return /^[a-zA-Z\s]+$/.test(val);
  }

  isNumbersOnly(val: string): boolean {
    if (!val) return true;
    return /^\d+$/.test(val);
  }

  isValidPhoneNumber(val: string): boolean {
    if (!val) return true;
    return /^\+?[0-9]{7,15}$/.test(val);
  }

  isValidEmail(val: string): boolean {
    if (!val) return true;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
  }

  saveChanges(form?: any) {
    const customValid = this.isLettersOnly(this.bank.Name) &&
                        this.isNumbersOnly(this.bank.Code) &&
                        this.isValidPhoneNumber(this.bank.Phone) &&
                        this.isValidEmail(this.bank.Email);

    if ((form && form.invalid) || !customValid) {
      if (form) {
        form.control.markAllAsTouched();
      }
      return;
    }
    console.log('Saving bank data:', this.bank);
    this.router.navigate(['/misc/bank/banklist']);
  }
}
