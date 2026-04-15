import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNew } from './patient-new';

describe('PatientNew', () => {
  let component: PatientNew;
  let fixture: ComponentFixture<PatientNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
