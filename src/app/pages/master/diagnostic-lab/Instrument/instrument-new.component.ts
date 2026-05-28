import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-instrument-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './instrument-new.component.html',
})
export class InstrumentNewComponent {
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
