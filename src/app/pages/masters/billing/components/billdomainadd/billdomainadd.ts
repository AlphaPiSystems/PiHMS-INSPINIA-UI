import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-bill-domain-add',
    standalone: true,
    imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
    templateUrl: './billdomainadd.html',
    styleUrls: ['./billdomainadd.scss']
})
export class BillDomainAdd implements OnInit {

  billDomain: any = {
    Name: '',
    Code: '',
    Description: '',
    IsHeaderImagePresent: 'N',
    HeaderImage: null,
    IsFooterImagePresent: 'N',
    FooterImage: null,
    PaperSize: 'A4',
    DomainPriority: '1',
    DomainConfig: '',
    DomainType: 'General',
    IsRowDeleted: 'N'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialization if needed
  }

  onSubmit() {
    console.log('Submitting Bill Domain:', this.billDomain);
    // In a real app, you'd call a service to POST to the API
    alert('Bill Domain added successfully (Mock)');
  }
}
