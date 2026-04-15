import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitNew } from './visit-new';

describe('VisitNew', () => {
  let component: VisitNew;
  let fixture: ComponentFixture<VisitNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
