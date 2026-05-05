import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagTestEdit } from './diagtestedit';

describe('DiagTestEdit', () => {
  let component: DiagTestEdit;
  let fixture: ComponentFixture<DiagTestEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagTestEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagTestEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
