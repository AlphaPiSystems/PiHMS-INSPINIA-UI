import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucideBox, LucidePlus, LucideSearch } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface SampleType {
  id: number;
  FullName: string;
  ShortName: string;
  Code: string;
  Description: string;
  SampleForm: string;
  Container: string;
  BranchName: string;
  DepartmentName: string;
  [key: string]: any;
}

const SAMPLE_DATA: SampleType[] = [
  { "id": 1, "FullName": "Blood", "ShortName": "BLD", "Code": "SMP001", "Description": "Plain Blood used BioChemistry Investigation", "SampleForm": "Liquid", "Container": "Plain Tube", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry" },
  { "id": 2, "FullName": "EDTA Blood", "ShortName": "EDTA", "Code": "SMP002", "Description": "EDTA blood sample for hematology tests", "SampleForm": "Liquid", "Container": "EDTA Tube", "BranchName": "Main Branch", "DepartmentName": "Haematology" },
  { "id": 3, "FullName": "Citrate Blood", "ShortName": "Citrate", "Code": "SMP003", "Description": "Citrate anticoagulated blood for coagulation studies", "SampleForm": "Liquid", "Container": "Citrate Tube", "BranchName": "Main Branch", "DepartmentName": "Haematology" },
  { "id": 4, "FullName": "Heparin Blood", "ShortName": "Heparin", "Code": "SMP004", "Description": "Heparinized blood sample for plasma tests", "SampleForm": "Liquid", "Container": "Heparin Tube", "BranchName": "Main Branch", "DepartmentName": "Haematology" },
  { "id": 5, "FullName": "Urine", "ShortName": "Urine", "Code": "SMP005", "Description": "Random urine sample for routine analysis", "SampleForm": "Liquid", "Container": "Urine Container", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry" },
  { "id": 6, "FullName": "24 Hours Urine", "ShortName": "24H Urine", "Code": "SMP006", "Description": "24-hour pooled urine sample for quantitative testing", "SampleForm": "Liquid", "Container": "24H Urine Jar", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry" },
  { "id": 7, "FullName": "PUS", "ShortName": "Pus", "Code": "SMP007", "Description": "Pus sample for culture and sensitivity tests", "SampleForm": "Semi-solid", "Container": "Sterile Container", "BranchName": "Main Branch", "DepartmentName": "Microbiology" },
  { "id": 8, "FullName": "Sputum", "ShortName": "Sputum", "Code": "SMP008", "Description": "Morning sputum sample for AFB staining and culture", "SampleForm": "Semi-solid", "Container": "Sputum Cup", "BranchName": "Main Branch", "DepartmentName": "Microbiology" },
  { "id": 9, "FullName": "Aspirated Fluid", "ShortName": "Asp Fluid", "Code": "SMP009", "Description": "Aspirated body fluid (pleural, peritoneal, etc.)", "SampleForm": "Liquid", "Container": "Sterile Tube", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry" },
  { "id": 10, "FullName": "CSF", "ShortName": "CSF", "Code": "SMP010", "Description": "Cerebrospinal fluid sample for analysis", "SampleForm": "Liquid", "Container": "CSF Tube", "BranchName": "Main Branch", "DepartmentName": "Pathology" },
  { "id": 11, "FullName": "SWAB", "ShortName": "Swab", "Code": "SMP011", "Description": "Throat, nasal or wound swab for culture", "SampleForm": "Solid", "Container": "Swab Stick", "BranchName": "Main Branch", "DepartmentName": "Microbiology" },
  { "id": 12, "FullName": "Smears", "ShortName": "Smear", "Code": "SMP012", "Description": "Smear preparation on slide for microscopic examination", "SampleForm": "Solid", "Container": "Glass Slide", "BranchName": "Main Branch", "DepartmentName": "Pathology" },
  { "id": 13, "FullName": "Spicimens", "ShortName": "Specimen", "Code": "SMP013", "Description": "Biopsy or tissue specimen for histopathology", "SampleForm": "Solid", "Container": "Formalin Jar", "BranchName": "Main Branch", "DepartmentName": "Pathology" },
  { "id": 14, "FullName": "Stool", "ShortName": "Stool", "Code": "SMP014", "Description": "Stool specimen for ova, parasites, or occult blood", "SampleForm": "Semi-solid", "Container": "Stool Container", "BranchName": "Main Branch", "DepartmentName": "Microbiology" },
  { "id": 15, "FullName": "Semen", "ShortName": "Semen", "Code": "SMP015", "Description": "Semen sample for fertility and post-vasectomy analysis", "SampleForm": "Liquid", "Container": "Sterile Container", "BranchName": "Main Branch", "DepartmentName": "Pathology" },
  { "id": 16, "FullName": "Serum", "ShortName": "Serum", "Code": "SMP016", "Description": "Serum sample for serology and immunology tests", "SampleForm": "Liquid", "Container": "Plain Tube", "BranchName": "Main Branch", "DepartmentName": "Bio Chemistry" }
];

@Component({
  selector: 'app-sample-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NgIcon,
    AsyncPipe,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    NgbTooltipModule
  ],
  templateUrl: './sample-list.component.html',
  providers: [TableService]
})
export class SampleListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucideBox = LucideBox;
  protected readonly LucidePlus = LucidePlus;

  dateFilter = 'all';
  total$: Observable<number>;
  samples$: Observable<SampleType[]>;

  constructor(public tableService: TableService<SampleType>) {
    this.samples$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.tableService.setItems(SAMPLE_DATA, 10);
  }

  applyDateFilter() {
    this.tableService.setFilter('SampleForm', this.dateFilter === 'all' ? '' : this.dateFilter);
  }

  addSample() {
    this.router.navigate(['/master/diagnostic-lab/sample-new']);
  }

  editSample(id: number) {
    this.router.navigate(['/master/diagnostic-lab/sample-edit'], { queryParams: { id: id } });
  }

  get hasSelection(): boolean {
    return this.tableService.hasSelectedItems();
  }

  deleteSelected() {
    if (confirm('Are you sure you want to delete selected items?')) {
      this.tableService.deleteSelectedItems();
    }
  }
}
