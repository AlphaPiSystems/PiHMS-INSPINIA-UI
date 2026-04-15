import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerBootstrapDirective } from 'ngx-daterangepicker-bootstrap';
import dayjs from 'dayjs';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { PatientType } from '../../data';
import { Observable } from 'rxjs';
import patientdata from '../../patientdata.json';
import { PageTitleComponent } from '@app/components/page-title.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule, NgxDaterangepickerBootstrapDirective, PageTitleComponent],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  constructor(private route: ActivatedRoute) {}

  patient = {
    // Personal
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    age: null as number | null,
    maritalStatus: '',
    bloodGroup: '',

    // Additional
    aadhaarNumber: '',
    abhaId: '',
    phoneNumber: '',
    email: '',
    religion: '',
    occupation: '',
    monthlyIncome: null as number | null,
    nationality: 'Indian',
    category: '',
    patientType: 'OPD',

    // Address
    address: '',
    addressLine2: '',
    country: 'India',
    state: '',
    city: '',
    postalCode: '',

    // Emergency
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    relationship: '',
    referringDoctor: '',
    familyDoctor: '',
    insuranceProvider: '',
    policyNumber: '',
    imageUrl: '' as string
  }
  // ✅ OUTSIDE patient object
imageUrl: string | ArrayBuffer | null = null;

  countries: string[] = ['India', 'United States', 'United Kingdom', 'Other'];

  indiaStates: string[] = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'West Bengal',
  ];

  karnatakaCities: string[] = [
    'Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi',
    'Kalaburagi', 'Ballari', 'Shivamogga', 'Tumkur', 'Davangere',
  ];

  doctors: { id: string; name: string }[] = [
    { id: 'doc1', name: 'Dr. Anand Rao' },
    { id: 'doc2', name: 'Dr. Priya Sharma' },
    { id: 'doc3', name: 'Dr. Suresh Nair' },
    { id: 'doc4', name: 'Dr. Meena Reddy' },
  ];

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
   

  if (id) {
    const data = (patientdata as any[]).find(p => p.id === +id);

    if (data) {
      this.patient = data; // ✅ PREFILL WORKS
      this.imageUrl = data.imageUrl;
    }
  }
}

  savePatient(): void {
    console.log('Save patient:', this.patient);
    // call your API service here
  }

  saveDraft(): void {
    console.log('Save draft:', this.patient);
  }

  cancelDetails(): void {
    // navigate back or reset
  }


onFileChange(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
      this.patient.imageUrl = reader.result as string; // ✅ FIXED
    };

    reader.readAsDataURL(file);
  }
}
removeImage() {
  this.imageUrl = null;
}
}