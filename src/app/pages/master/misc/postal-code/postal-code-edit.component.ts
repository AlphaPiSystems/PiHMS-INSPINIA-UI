import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { POSTAL_CODE_DATA } from './postal-code-list.component';

@Component({
  selector: 'app-postal-code-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './postal-code-edit.component.html',
})
export class PostalCodeEditComponent implements OnInit {
  postalCodeId: string | null = null;
  postalCodeData: any = {
    id: null,
    PostalCode: '',
    PostOfficeName: '',
    AreaName: '',
    CityName: '',
    DistrictName: '',
    StateName: '',
    CountryName: '',
    BranchName: '',
    DepartmentName: '',
    Status: 'Active'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.postalCodeId = params['id'];
        this.loadPostalCode(this.postalCodeId);
      }
    });
  }

  loadPostalCode(id: string | null): void {
    if (id) {
      const found = POSTAL_CODE_DATA.find(c => c.id === Number(id));
      if (found) {
        this.postalCodeData = { ...found };
      }
    }
  }

  updatePostalCode(): void {
    console.log('Postal Code updated:', this.postalCodeData);
    this.router.navigate(['/master/misc/postal-code-list']);
  }
}
