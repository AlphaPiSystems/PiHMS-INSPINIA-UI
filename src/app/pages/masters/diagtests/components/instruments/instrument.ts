import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { InstrumentType } from '../../types';

@Component({
  selector: 'app-instrument',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './instrument.html',
})
export class Instrument implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  instruments: InstrumentType[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data && data.instrument) {
          this.instruments = data.instrument;
        }
      },
      error: (err) => {
        console.error('Error loading instruments from JSON:', err);
      }
    });
  }

  getFilteredInstruments() {
    let filtered = this.instruments;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.instruments.filter(i => 
        i.InstrumentationName && i.InstrumentationName.toLowerCase().includes(search)
      );
    }
    return filtered;
  }

  getPaginatedInstruments() {
    const filtered = this.getFilteredInstruments();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.getFilteredInstruments().length / this.itemsPerPage);
  }
}
