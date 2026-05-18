import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PageTitleComponent } from '../../../../../components/page-title.component';

@Component({
  selector: 'app-admittedfor-add',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageTitleComponent],
  templateUrl: './admittedforadd.html',
})
export class AdmittedForAdd implements OnInit {
  item: any = {
    id: null,
    Type: '',
    Description: '',
    BranchID: 1,
    DepartmentID: 1,
    CreatedStaffID: 1,
    CreatedDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
    UpdatedStaffID: null,
    UpdatedDateTime: null,
    IsRowDeleted: 'N'
  };
  
  isEdit = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.http.get<any>('assets/data/db.json').subscribe(data => {
        if (data && data.admittedfor) {
          const found = data.admittedfor.find((i: any) => i.id == id);
          if (found) {
            this.item = { ...found };
          }
        }
      });
    }
  }

  saveChanges() {
    console.log(this.isEdit ? 'Updating...' : 'Saving...', this.item);
    // In a real app, you'd call a service to POST/PUT to db.json (via json-server)
    this.router.navigate(['/admittedfor/admittedforlist']);
  }
}
