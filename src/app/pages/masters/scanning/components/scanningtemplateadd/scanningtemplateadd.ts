import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '@app/components/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScanningTemplateType } from '../../types';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-scanningtemplateadd',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule, QuillModule],
  templateUrl: './scanningtemplateadd.html',
})
export class ScanningTemplateAdd implements OnInit {
  item: ScanningTemplateType = {
    id: 0,
    Name: '',
    Description: '',
    IsRowDeleted: 'N',
    CreatedBy: 'Admin',
    CreatedDateTime: new Date().toISOString(),
    UpdatedBy: null,
    UpdatedDateTime: null,
    Status: 'Active',
    ScanTemplateData: ''
  };

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  save() {
    // In a real application, you would send a POST request to your API
    this.http.post('api/scanningtemplate', this.item).subscribe({
      next: () => {
        console.log('Successfully saved new scanning template:', this.item);
        this.location.back();
      },
      error: (err) => {
        console.error('Error saving template:', err);
        // Even if it fails, we log it and go back in this prototype
        this.location.back();
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
