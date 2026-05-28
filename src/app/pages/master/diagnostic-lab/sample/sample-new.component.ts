import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sample-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sample-new.component.html',
})
export class SampleNewComponent {
  sample: any = {
    FullName: '',
    ShortName: '',
    Code: '',
    Description: '',
    SampleForm: '',
    Container: '',
    BranchName: 'Main Branch',
    DepartmentName: ''
  };

  constructor(private router: Router) {}

  saveSample() {
    console.log('Sample saved:', this.sample);
    this.router.navigate(['/master/diagnostic-lab/samples-list']);
  }
}
