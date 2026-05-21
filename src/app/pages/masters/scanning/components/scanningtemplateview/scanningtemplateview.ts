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
  selector: 'app-scanningtemplateview',
  standalone: true,
  imports: [CommonModule, FormsModule, PageTitleComponent, LucideAngularModule, QuillModule],
  templateUrl: './scanningtemplateview.html',
})
export class ScanningTemplateView implements OnInit {
  item: ScanningTemplateType | null = null;

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
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>(`assets/data/db.json?v=${new Date().getTime()}`).subscribe(data => {
      if (data && data.scanningtemplate) {
        this.route.params.subscribe(params => {
          const id = +params['id'];
          if (id) {
            this.item = data.scanningtemplate.find((i: any) => i.id === id);
            console.log('Loaded item:', this.item);
          }
        });
      }
    });
  }

  save() {
    if (this.item) {
      // In a real application, you would send a PUT request to your API
      // For now, we simulate the save and navigate back
      this.http.put(`api/scanningtemplate/${this.item.id}`, this.item).subscribe({
        next: () => {
          console.log('Successfully updated scanning template:', this.item);
          this.location.back();
        },
        error: (err) => {
          console.error('Error updating template:', err);
          // Even if it fails (because no backend is running), we'll log it
          // In development, you might still want to go back
          this.location.back();
        }
      });
    }
  }

  
}
