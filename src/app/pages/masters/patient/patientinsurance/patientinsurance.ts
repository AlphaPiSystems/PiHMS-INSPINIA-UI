import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { PatientInsuranceType } from '../types';

@Component({
  selector: 'app-patientinsurance',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, FormsModule, PageTitleComponent, LucideAngularModule, NgbPagination, NgbPaginationNext, NgbPaginationPrevious],
  templateUrl: './patientinsurance.html',
})
export class PatientInsurance implements OnInit {
  protected readonly LucideSearch = LucideSearch;
  
  insuranceList: PatientInsuranceType[] = [];
  patients: any[] = [];
  providers: any[] = [];

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load Patient Insurance
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.insuranceList = data.patient_insurance || [];
        this.providers = data.insurance || [];
        this.patients = data.patient || [];
      }
    });
  }

  getPatientName(id: number | null): string {
    if (!id) return '-';
    const patient = this.patients.find(p => p.id == id);
    return patient ? `${patient.FirstName} ${patient.LastName}` : '-';
  }

  getFilteredInsurance() {
    let filtered = this.insuranceList;
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = this.insuranceList.filter(i => {
        const patientName = this.getPatientName(i.PatientID).toLowerCase();
        return (i.PolicyNumber && i.PolicyNumber.toLowerCase().includes(search)) ||
          (i.InsuranceName && i.InsuranceName.toLowerCase().includes(search)) ||
          (i.VerificationStatus && i.VerificationStatus.toLowerCase().includes(search)) ||
          patientName.includes(search);
      });
    }
    return filtered;
  }

  getPaginatedInsurance() {
    const filtered = this.getFilteredInsurance();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
