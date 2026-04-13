import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitEdit } from './visit-edit';

describe('VisitEdit', () => {
  let component: VisitEdit;
  let fixture: ComponentFixture<VisitEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
