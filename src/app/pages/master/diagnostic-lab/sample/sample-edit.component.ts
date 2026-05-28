import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sample-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sample-edit.component.html',
})
export class SampleEditComponent implements OnInit {
  sampleId: number | null = null;

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.sampleId = +params['id'];
        this.loadSample(this.sampleId);
      }
    });
  }

  loadSample(id: number): void {
    // TODO: Replace with actual API call
    // For now, pre-populate with placeholder data matching the id
    console.log('Loading sample with id:', id);
  }

  updateSample(): void {
    console.log('Sample updated:', this.sample);
    this.router.navigate(['/master/diagnostic-lab/samples-list']);
  }
}
