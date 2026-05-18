import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { QuillModule } from 'ngx-quill';

import { PageTitleComponent } from '@app/components/page-title.component';
import { TestTemplateType, TestType } from '../../types';

@Component({
  selector: 'app-testtemplateadd',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    QuillModule,
    PageTitleComponent
  ],
  templateUrl: './testtemplateadd.html',
})
export class TestTemplateAdd implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private location = inject(Location);

  template: TestTemplateType = {
    id: 0,
    DiagTestID: null,
    DiagTestCode: '',
    DiagTestName: '',
    DoctorStaffID: null,
    DoctorStaffName: '',
    TemplateName: '',
    TemplateData: '',
    TemplateDataStr: '',
    BranchID: 1,
    DepartmentID: 1,
    CreatedStaffID: 1,
    CreatedDateTime: new Date().toISOString(),
    UpdatedStaffID: null,
    UpdatedDateTime: null,
    IsRowDeleted: 'N'
  };

  diagTests: TestType[] = [];
  doctors: any[] = [];

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          if (data.diagtest) {
            this.diagTests = data.diagtest.filter((t: any) => t.IsRowDeleted !== 'Y');
          }
          if (data.staff) {
            // Filter for doctors if possible, otherwise show all
            this.doctors = data.staff.filter((s: any) => 
              s.Designation?.toLowerCase().includes('doctor') || 
              s.Honorific?.toLowerCase().includes('dr') ||
              s.Name?.toLowerCase().includes('dr.')
            );
            if (this.doctors.length === 0) {
                this.doctors = data.staff;
            }
          }
        }
      },
      error: (err) => {
        console.error('Error loading dropdown data:', err);
      }
    });
  }

  onDiagTestChange(): void {
    const selectedTest = this.diagTests.find(t => t.id === Number(this.template.DiagTestID));
    if (selectedTest) {
      this.template.DiagTestCode = selectedTest.Code;
      this.template.DiagTestName = selectedTest.Name;
    }
  }

  onDoctorChange(): void {
    const selectedDoctor = this.doctors.find(d => d.id === Number(this.template.DoctorStaffID));
    if (selectedDoctor) {
      this.template.DoctorStaffName = selectedDoctor.Name;
    }
  }

  save(): void {
    // Basic validation
    if (!this.template.DiagTestID || !this.template.TemplateName) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would be a POST request
    console.log('Saving template:', this.template);
    
    // Simulate save
    this.http.post('api/testtemplate', this.template).subscribe({
      next: () => {
        this.router.navigate(['/testtemplate/testtemplatelist']);
      },
      error: (err) => {
        console.error('Error saving template:', err);
        // Navigate anyway since we don't have a real backend
        this.router.navigate(['/testtemplate/testtemplatelist']);
      }
    });
  }

  cancel(): void {
    this.location.back();
  }
}
