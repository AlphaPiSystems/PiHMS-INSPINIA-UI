import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {tablerChevronRight} from '@ng-icons/tabler-icons';

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
              
              <ng-container *ngFor="let part of subTitleParts">
                <li class="breadcrumb-item"><a href="javascript: void(0);" style="color: #676a6c;">{{ part }}</a></li>
                <li class="d-flex justify-content-center">
                  <ng-icon name="tablerChevronRight" size="12" class="breadcrumb-arrow align-middle mx-1" style="color: #999;"/>
                </li>
              </ng-container>

            </ol>
          </div>
        </div>
        `
})
export class PageTitleComponent {
    @Input() title: string = 'Welcome!';
    @Input() subTitle: string | null = null;

    get subTitleParts(): string[] {
      if (!this.subTitle) return [];
      return this.subTitle.split('>').map(s => s.trim()).filter(s => s.length > 0);
    }
}
