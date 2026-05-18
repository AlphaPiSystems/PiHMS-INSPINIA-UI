import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerChevronRight} from '@ng-icons/tabler-icons';

export type BreadcrumbItemType = {
  label: string;
  path?: string;
  active?: boolean;
}

@Component({
    selector: 'app-page-title',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIcon],
    providers: [provideIcons({tablerChevronRight})],
    template: `
        <div class="page-title-head mb-3">
          <div class="d-flex flex-column">
            <h4 class="fs-sm text-uppercase fw-bold m-0" style="font-size: 18px; letter-spacing: 0.5px; color: #333;">{{ title }}</h4>
            <ol class="breadcrumb m-0 py-1" style="font-size: 11px; background: transparent; align-items: center;">
              
              <!-- Traditional subTitle backward compatibility -->
              <ng-container *ngIf="!breadcrumbItems.length && subTitle">
                <ng-container *ngFor="let part of subTitleParts; let last = last">
                  <li class="breadcrumb-item"><a href="javascript: void(0);" style="color: #676a6c;">{{ part }}</a></li>
                  <li class="d-flex justify-content-center" *ngIf="!last">
                    <ng-icon name="tablerChevronRight" size="12" class="breadcrumb-arrow align-middle mx-1" style="color: #999;"/>
                  </li>
                </ng-container>
              </ng-container>

              <!-- New breadcrumbItems support -->
              <ng-container *ngIf="breadcrumbItems.length">
                <ng-container *ngFor="let item of breadcrumbItems; let last = last">
                  <li class="breadcrumb-item" [class.active]="item.active">
                    <a *ngIf="item.path && !item.active" [routerLink]="item.path" style="color: #1ab394; text-decoration: none;">{{ item.label }}</a>
                    <span *ngIf="!item.path || item.active" [style.color]="item.active ? '#676a6c' : '#676a6c'">{{ item.label }}</span>
                  </li>
                  <li class="d-flex justify-content-center" *ngIf="!last">
                    <ng-icon name="tablerChevronRight" size="12" class="breadcrumb-arrow align-middle mx-1" style="color: #999;"/>
                  </li>
                </ng-container>
              </ng-container>

            </ol>
          </div>
        </div>
        `
})
export class PageTitleComponent {
    @Input() title: string = 'Welcome!';
    @Input() subTitle: string | null = null;
    @Input() breadcrumbItems: BreadcrumbItemType[] = [];

    get subTitleParts(): string[] {
      if (!this.subTitle) return [];
      return this.subTitle.split('>').map(s => s.trim()).filter(s => s.length > 0);
    }
}

