import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientIndex } from './patient-index';

describe('PatientIndex', () => {
  let component: PatientIndex;
  let fixture: ComponentFixture<PatientIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
