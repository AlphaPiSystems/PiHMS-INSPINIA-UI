import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus, LucideSearch, LucideBox } from 'lucide-angular';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from '@core/services/table.service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Observable } from 'rxjs';

export interface ItemType {
  id: number;
  Name: string;
  Description: string;
  Category: string;
  TypeID: number | null;
  TypeName: string | null;
  PhysicalFormID: number | null;
  PhysicalFormName: string | null;
  StorageFormID: number | null;
  StorageFormName: string | null;
  BuyConsumeMeasuringUnitID: number | null;
  BuyConsumeMeasuringUnitName: string | null;
  MinStockForAlert: number | null;
  AlertStaffID: number | null;
  AlertStaffName: string | null;
  BranchID: number | null;
  DepartmentID: number | null;
  CreatedStaffID: string | null;
  CreatedDateTime: string | null;
  UpdatedStaffID: string | null;
  UpdatedDateTime: string | null;
  IsRowDeleted: string;
  CurrentStock: number | null;
  Balance: number | null;
  PackSize: number | null;
  Qty: number | null;
  PackSizeUnits: string | null;
  ItemType: string | null;
  IssueDate: string | null;
  StockUnit: string | null;
  PurchaseUnit: string | null;
  IssueUnit: string | null;
  UsageDescription: string | null;
  ItemCode: string | null;
  ConversionLogic: string | null;
  [key: string]: any;
}

export const ITEM_DATA: ItemType[] = [
    {
      "id": 1,
      "Name": "LEAVING AGAINST MEDICAL ADVICE",
      "Description": "Standard medical documentation form for Leaving Against Medical Advice.",
      "Category": "MOVABLE",
      "TypeID": 1,
      "TypeName": "Stationery",
      "PhysicalFormID": null,
      "PhysicalFormName": "Paper",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:14:27",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2022-02-26 14:18:36",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    },
    {
      "id": 2,
      "Name": "NEW BORN BABY ASSESSMENT FORM",
      "Description": "Standard medical documentation form for New Born Baby Assessment Form.",
      "Category": "MOVABLE",
      "TypeID": 1,
      "TypeName": "Stationery",
      "PhysicalFormID": null,
      "PhysicalFormName": "Paper",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:16:14",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2021-11-25 16:42:10",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    },
    {
      "id": 3,
      "Name": "CONSENT REQUEST FOR MTP FORM C",
      "Description": "Standard clinical informed consent form for Consent Request For Mtp Form C.",
      "Category": "MOVABLE",
      "TypeID": 1,
      "TypeName": "Stationery",
      "PhysicalFormID": null,
      "PhysicalFormName": "Paper",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:17:18",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2020-09-24 14:20:26",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    },
    {
      "id": 4,
      "Name": "TRANSFUSION REACTION FORM",
      "Description": "Standard medical documentation form for Transfusion Reaction Form.",
      "Category": "MOVABLE",
      "TypeID": 1,
      "TypeName": "Stationery",
      "PhysicalFormID": null,
      "PhysicalFormName": "Paper",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:18:10",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2021-10-30 19:49:59",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    },
    {
      "id": 5,
      "Name": "CARE BUNDLE CHECKLIST IV CANULA",
      "Description": "Sterile intravenous cannula for vascular access.",
      "Category": "MOVABLE",
      "TypeID": 3,
      "TypeName": "Medical Supply",
      "PhysicalFormID": null,
      "PhysicalFormName": "Cannula",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:18:56",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2022-03-26 13:19:41",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    },
    {
      "id": 6,
      "Name": "MEDICAL RECORD CHECKLIST",
      "Description": "Clinical quality control checklist for Medical Record Checklist.",
      "Category": "MOVABLE",
      "TypeID": 1,
      "TypeName": "Stationery",
      "PhysicalFormID": null,
      "PhysicalFormName": "Paper",
      "StorageFormID": null,
      "StorageFormName": null,
      "BuyConsumeMeasuringUnitID": null,
      "BuyConsumeMeasuringUnitName": null,
      "MinStockForAlert": null,
      "AlertStaffID": null,
      "AlertStaffName": null,
      "BranchID": null,
      "DepartmentID": null,
      "CreatedStaffID": "1983",
      "CreatedDateTime": "2020-09-23 16:19:33",
      "UpdatedStaffID": null,
      "UpdatedDateTime": "2022-03-26 13:19:41",
      "IsRowDeleted": "N",
      "CurrentStock": null,
      "Balance": null,
      "PackSize": null,
      "Qty": null,
      "PackSizeUnits": null,
      "ItemType": "Consumable",
      "IssueDate": null,
      "StockUnit": "NO",
      "PurchaseUnit": "NO",
      "IssueUnit": "NO",
      "UsageDescription": null,
      "ItemCode": null,
      "ConversionLogic": "default"
    }
];

@Component({
  selector: 'app-item-list',
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
  templateUrl: './item-list.component.html',
  providers: [TableService]
})
export class ItemListComponent implements OnInit {
  private router = inject(Router);
  protected readonly LucideSearch = LucideSearch;
  protected readonly LucidePlus = LucidePlus;
  protected readonly LucideBox = LucideBox;

  typeFilter: string = 'all';
  total$: Observable<number>;
  items$: Observable<ItemType[]>;

  constructor(public tableService: TableService<ItemType>) {
    this.items$ = this.tableService.items$;
    this.total$ = this.tableService.total$;
  }

  applyTypeFilter() {
    if (this.typeFilter === 'all') {
      this.tableService.setItems(ITEM_DATA, this.tableService.pageSize);
    } else {
      const filtered = ITEM_DATA.filter(t => t.TypeName === this.typeFilter);
      this.tableService.setItems(filtered, this.tableService.pageSize);
    }
  }

  ngOnInit(): void {
    this.tableService.setItems(ITEM_DATA, 10);
  }

  addItem() {
    this.router.navigate(['/master/misc/item-new']);
  }

  editItem(id: number) {
    this.router.navigate(['/master/misc/item-edit'], { queryParams: { id: id } });
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
