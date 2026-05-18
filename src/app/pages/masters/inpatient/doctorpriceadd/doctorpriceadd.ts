import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PageTitleComponent } from '../../../../components/page-title.component';

@Component({
  selector: 'app-doctorprice-add',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './doctorpriceadd.html'
})
export class DoctorPriceAdd implements OnInit {
  isEdit = false;
  item: any = {
    DoctorID: '',
    ItemID: '',
    WardTypeID: '',
    Specialization: '',
    Price: 0,
    BranchID: 1,
    DepartmentID: 1,
    IsRowDeleted: 'N'
  };

  staffs: any[] = [];
  billItems: any[] = [];
  wardTypes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.http.get<any>('assets/data/db.json').subscribe(data => {
      if (data) {
        this.staffs = data.staff || [];
        this.billItems = data.bill_item || [];
        this.wardTypes = data.wardtype || [];

        if (id) {
          this.isEdit = true;
          const found = data.doctor_price?.find((p: any) => p.id === +id);
          if (found) {
            this.item = { ...found };
          }
        }
      }
    });
  }

  saveChanges() {
    console.log(this.isEdit ? 'Updating...' : 'Saving...', this.item);
    this.router.navigate(['/inpatient/doctorprice/list']);
  }
}
