import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { QuillModule } from 'ngx-quill';

import { PageTitleComponent } from '@app/components/page-title.component';
import { TestTemplateType, TestType } from '../../types';

@Component({
  selector: 'app-testtemplateedit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    QuillModule,
    PageTitleComponent
  ],
  templateUrl: './testtemplateedit.html',
})
export class TestTemplateEdit implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  template: TestTemplateType | null = null;
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
    this.loadData();
  }

  loadData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.http.get<any>('assets/data/db.json').subscribe({
      next: (data) => {
        if (data) {
          if (data.diagtest) {
            this.diagTests = data.diagtest.filter((t: any) => t.IsRowDeleted !== 'Y');
          }
          if (data.staff) {
            this.doctors = data.staff.filter((s: any) => 
              s.Designation?.toLowerCase().includes('doctor') || 
              s.Honorific?.toLowerCase().includes('dr') ||
              s.Name?.toLowerCase().includes('dr.')
            );
            if (this.doctors.length === 0) {
                this.doctors = data.staff;
            }
          }
          
          if (data.testtemplate && id) {
            this.template = data.testtemplate.find((t: any) => t.id === id) || null;
            if (this.template) {
                // Ensure ID is a number for comparison in select
                this.template.DiagTestID = this.template.DiagTestID ? Number(this.template.DiagTestID) : null;
                this.template.DoctorStaffID = this.template.DoctorStaffID ? Number(this.template.DoctorStaffID) : null;
            }
          }
        }
      },
      error: (err) => {
        console.error('Error loading data:', err);
      }
    });
  }

  onDiagTestChange(): void {
    if (!this.template) return;
    const selectedTest = this.diagTests.find(t => t.id === Number(this.template?.DiagTestID));
    if (selectedTest) {
      this.template.DiagTestCode = selectedTest.Code;
      this.template.DiagTestName = selectedTest.Name;
    }
  }

  onDoctorChange(): void {
    if (!this.template) return;
    const selectedDoctor = this.doctors.find(d => d.id === Number(this.template?.DoctorStaffID));
    if (selectedDoctor) {
      this.template.DoctorStaffName = selectedDoctor.Name;
    }
  }

  save(): void {
    if (!this.template) return;
    
    // Basic validation
    if (!this.template.DiagTestID || !this.template.TemplateName) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Updating template:', this.template);
    
    // Simulate update
    this.http.put(`api/testtemplate/${this.template.id}`, this.template).subscribe({
      next: () => {
        this.router.navigate(['/testtemplate/testtemplatelist']);
      },
      error: (err) => {
        console.error('Error updating template:', err);
        this.router.navigate(['/testtemplate/testtemplatelist']);
      }
    });
  }

  cancel(): void {
    this.location.back();
  }
}
