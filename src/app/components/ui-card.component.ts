
import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ui-card',
    imports: [NgIcon, NgbCollapse],
    template: `
        @if (isVisible) {
          <div class="card">
            <div class="card-header justify-content-between align-items-center" [class]="{'border-0':isCollapsed}">
              <h5 class="card-title">{{ title }}</h5>
              <div>
                @if (isTogglable || isReloadable ||  isCloseable) {
                  <div class="card-action">
                    @if (isTogglable) {
                      <button (click)="isCollapsed = !isCollapsed"
                        class="card-action-item border-0">
                        @if (!isCollapsed) {
                          <ng-icon name="tablerChevronUp"/>
                        }
                        @if (isCollapsed) {
                          <ng-icon name="tablerChevronDown"/>
                        }
                      </button>
                    }
                    @if (isReloadable) {
                      <button (click)="reload()" class="card-action-item border-0">
                        <ng-icon name="tablerRefresh"/>
                      </button>
                    }
                    @if (isCloseable) {
                      <button (click)="close()" class="card-action-item border-0">
                        <ng-icon name="tablerX"/>
                      </button>
                    }
                  </div>
                }
                <ng-content select="[helper-text]"></ng-content>
              </div>
            </div>
            <div class="card-body p-0 {{bodyClass}}" #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed">
              <ng-content select="[card-body]"></ng-content>
            </div>
            @if (isReloading) {
              <div class="card-overlay d-flex">
                <div class="spinner-border text-primary"></div>
              </div>
            }
          </div>
        }
        `
})
export class UiCardComponent {
    @Input() title!: string
    @Input() bodyClass?: string
    @Input() isTogglable?: boolean
    @Input() isReloadable?: boolean
    @Input() isCloseable?: boolean

    isCollapsed = false
    isReloading = false;
    isVisible = true;

    reload() {
        this.isReloading = true;
        setTimeout(() => (this.isReloading = false), 1500); // fake reload
    }

    close() {
        this.isVisible = false;
    }
}
