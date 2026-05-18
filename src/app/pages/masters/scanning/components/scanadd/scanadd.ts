import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScanType } from '../../types';

@Component({
  selector: 'app-scanadd',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './scanadd.html',
})
export class ScanAdd implements OnInit {
  scan: ScanType = {
    id: 0,
    Name: '',
    Description: '',
    IsRowDeleted: 'N',
    CreatedBy: 'Admin',
    CreatedDateTime: new Date().toISOString(),
    UpdatedBy: null,
    UpdatedDateTime: null,
    Status: 'Active'
  };

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  save() {
    console.log('Saving scan:', this.scan);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
