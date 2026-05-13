import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScanningItemType, ScanType } from '../../types';

@Component({
  selector: 'app-scanningitemadd',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './scanningitemadd.html',
})
export class ScanningItemAdd implements OnInit {
  item: ScanningItemType = {
    id: 0,
    ScanName: '',
    ScanID: '',
    Title: '',
    Description: '',
    IsRowDeleted: 'N',
    CreatedBy: 'Admin',
    CreatedDateTime: new Date().toISOString(),
    UpdatedBy: null,
    UpdatedDateTime: null,
    Priority: 0,
    Alignment: 'Left',
    ValueType: 'Text',
    Status: 'Active'
  };

  scans: ScanType[] = [];

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data && data.scan) {
        this.scans = data.scan;
      }
    });
  }

  onScanChange() {
    const selectedScan = this.scans.find(s => s.Name === this.item.ScanName);
    if (selectedScan) {
      this.item.ScanID = selectedScan.id.toString();
    }
  }

  save() {
    console.log('Saving scanning item:', this.item);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
