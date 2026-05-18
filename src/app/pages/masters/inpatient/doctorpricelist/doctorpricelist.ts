import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from '../../../../components/page-title.component';
import { TableService } from '../../../../core/services/table.service';

@Component({
  selector: 'app-doctorprice-list',
  standalone: true,
  imports: [
    CommonModule, 
    NgIcon, 
    RouterLink, 
    FormsModule, 
    PageTitleComponent, 
    LucideAngularModule, 
    NgbPagination, 
    NgbPaginationNext, 
    NgbPaginationPrevious, 
    AsyncPipe,
    NgbTooltipModule
  ],
  templateUrl: './doctorpricelist.html',
  providers: [TableService]
})
export class DoctorPriceList implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  protected readonly Math = Math;
  
  staffMap: Map<string, string> = new Map();
  billItemMap: Map<string, string> = new Map();
  wardTypeMap: Map<string, string> = new Map();
  
  items$: Observable<any[]>;
  total$: Observable<number>;

  constructor(public tableService: TableService<any>, private http: HttpClient) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          if (data.staff) {
            data.staff.forEach((s: any) => this.staffMap.set(s.id.toString(), s.Name));
          }
          if (data.bill_item) {
            data.bill_item.forEach((bi: any) => this.billItemMap.set(bi.id.toString(), bi.Name));
          }
          if (data.wardtype) {
            data.wardtype.forEach((wt: any) => this.wardTypeMap.set(wt.id.toString(), wt.Type));
          }

          if (data.doctor_price) {
            this.tableService.setItems(data.doctor_price, 10);
          }
        }
      },
      error: (err) => {
        console.error('Error loading data:', err);
      }
    });
  }

  getDoctorName(id: string | number): string {
    return this.staffMap.get(id?.toString()) || `ID: ${id}`;
  }

  getItemName(id: string | number): string {
    return this.billItemMap.get(id?.toString()) || `ID: ${id}`;
  }

  getWardTypeName(id: string | number): string {
    return this.wardTypeMap.get(id?.toString()) || `ID: ${id}`;
  }
}
