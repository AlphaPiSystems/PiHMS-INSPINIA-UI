import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-bill-domain-edit',
    standalone: true,
    imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent],
    templateUrl: './billdomainedit.html',
    styleUrls: ['./billdomainedit.scss']
})
export class BillDomainEdit implements OnInit {

  billDomain: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<{ bill_domain: any[] }>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.bill_domain) {
          this.billDomain = data.bill_domain.find(item => item.id === id) || {};
        }
      },
      error: (err) => {
        console.error('Error fetching bill domain for edit:', err);
      }
    });
  }

  onSubmit() {
    console.log('Updating Bill Domain:', this.billDomain);
    // In a real app, you'd call a service to PUT/PATCH to the API
    alert('Bill Domain updated successfully (Mock)');
    this.router.navigate(['/bill-domain/bill-domainlist']);
  }
}
