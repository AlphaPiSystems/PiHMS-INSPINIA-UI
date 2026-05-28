import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unit-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './unit-edit.component.html',
})
export class UnitEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  unit: any = {
    Name: '',
    FullName: '',
    DisplayName: '',
    Description: '',
    DepartmentName: '',
    Status: 'Active',
    BranchName: 'Main Branch'
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        // Load data based on id if needed, for now we just log it
        console.log('Editing Unit ID:', id);
      }
    });
  }

  saveUnit() {
    console.log('Unit saved:', this.unit);
    this.router.navigate(['/master/diagnostic-lab/units-list']);
  }
}
