import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Birthdetails } from './birthdetails';

describe('Birthdetails', () => {
  let component: Birthdetails;
  let fixture: ComponentFixture<Birthdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Birthdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Birthdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
