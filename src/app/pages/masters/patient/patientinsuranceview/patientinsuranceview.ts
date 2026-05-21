import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PatientInsuranceType } from '../types';

@Component({
  selector: 'app-patientinsuranceview',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule],
  templateUrl: './patientinsuranceview.html',
})
export class PatientInsuranceView implements OnInit {
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
    VerificationStatus: '',
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
    BranchID: null,
    DepartmentID: null,
    CreatedStaffID: null,
    CreatedDateTime: null,
    UpdatedStaffID: 1,
    UpdatedDateTime: new Date().toISOString(),
    IsRowDeleted: 'N',
    InsuranceType: '',
    InsuranceName: '',
    VerifiedBy: ''
  };

  patients: any[] = [];
  providers: any[] = [];
  branches: any[] = [];
  departments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.providers = data.insurance || [];
        this.branches = data.hospitalbuilding || [];
        this.departments = data.departments || [];
        this.patients = data.patient || [];
        
        if (data.patient_insurance) {
          this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id) {
              const found = data.patient_insurance.find((i: any) => i.id === id);
              if (found) {
                this.insurance = { ...found };
                this.insurance.UpdatedDateTime = new Date().toISOString();
                this.insurance.UpdatedStaffID = 1;
              }
            }
          });
        }
      }
    });
  }

  save() {
    console.log('Updating patient insurance:', this.insurance);
    this.location.back();
  }

  
}
