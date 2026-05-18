import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PatientInsuranceType } from '../types';

@Component({
  selector: 'app-patientinsuranceadd',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './patientinsuranceadd.html',
})
export class PatientInsuranceAdd implements OnInit {
  insurance: PatientInsuranceType = {
    id: 0,
    PatientID: null,
    PolicyNumber: '',
    PlanNumber: '',
    PlanType: '',
    EffectiveDate: null,
    ExpiryDate: null,
    Relationship: '',
    InsuranceProviderID: '',
    InsuranceProviderName: '',
    VerificationStatus: 'Pending',
    VerifiedStaffID: null,
    VerificationDate: null,
    VerificationNotes: '',
    InsurerNameAsInPolicy: '',
    Address: '',
    City: '',
    PostalCode: '',
    State: '',
    Country: '',
    RelationName: '',
    Relation_Address: '',
    Relation_City: '',
    Relation_PostalCode: '',
    Relation_State: '',
    Relation_Country: '',
    Relation_Phone: '',
    Relation_Email: '',
    SpecialNotes: '',
    BranchID: 1,
    DepartmentID: 1,
    CreatedStaffID: 1,
    CreatedDateTime: new Date().toISOString(),
    UpdatedStaffID: null,
    UpdatedDateTime: null,
    IsRowDeleted: 'N',
    InsuranceType: '',
    InsuranceName: '',
    VerifiedBy: ''
  };

  patients: any[] = [];
  providers: any[] = [];
  branches: any[] = [];
  departments: any[] = [];

  constructor(private location: Location, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.providers = data.insurance || [];
        this.branches = data.hospitalbuilding || [];
        this.departments = data.departments || [];
        this.patients = data.patient || [];
      }
    });
  }

  save() {
    console.log('Saving patient insurance:', this.insurance);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
