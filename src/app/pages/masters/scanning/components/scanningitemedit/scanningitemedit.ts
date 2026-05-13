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
  selector: 'app-scanningitemedit',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './scanningitemedit.html',
})
export class ScanningItemEdit implements OnInit {
  item: ScanningItemType | null = null;
  scans: ScanType[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        if (data.scan) {
          this.scans = data.scan;
        }
        
        this.route.params.subscribe(params => {
          const id = +params['id'];
          if (id && data.scanningitem) {
            this.item = data.scanningitem.find((i: any) => i.id === id);
          }
        });
      }
    });
  }

  onScanChange() {
    if (this.item) {
      const selectedScan = this.scans.find(s => s.Name === this.item?.ScanName);
      if (selectedScan) {
        this.item.ScanID = selectedScan.id.toString();
      }
    }
  }

  save() {
    if (this.item) {
      console.log('Updating scanning item:', this.item);
      this.location.back();
    }
  }

  cancel() {
    this.location.back();
  }
}
