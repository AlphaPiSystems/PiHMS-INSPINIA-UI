import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../../components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bankedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './bankedit.html',
})
export class BankEdit implements OnInit {
  bank: any = {};
  departments: any[] = [];
  branches: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.departments = data.departments || [];
        this.branches = data.hospitalbuilding || [];

        const id = this.route.snapshot.paramMap.get('id');
        if (id && data.bank) {
          const found = data.bank.find((b: any) => b.id == id);
          if (found) {
            this.bank = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log('Updating bank data:', this.bank);
  }
}
