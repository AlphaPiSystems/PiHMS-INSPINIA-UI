import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagGroup } from './diaggroup';

describe('DiagGroup', () => {
  let component: DiagGroup;
  let fixture: ComponentFixture<DiagGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
