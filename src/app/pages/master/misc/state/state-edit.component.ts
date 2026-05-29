import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { STATE_DATA } from './state-list.component';

@Component({
  selector: 'app-state-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './state-edit.component.html',
})
export class StateEditComponent implements OnInit {
  stateId: string | null = null;
  stateData: any = {
    id: null,
    Name: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.stateId = params['id'];
        this.loadState(this.stateId);
      }
    });
  }

  loadState(id: string | null): void {
    if (id) {
      const found = STATE_DATA.find(c => c.id === Number(id));
      if (found) {
        this.stateData = { ...found };
      }
    }
  }

  updateState(): void {
    console.log('State updated:', this.stateData);
    this.router.navigate(['/master/misc/state-list']);
  }
}
