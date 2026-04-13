import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagtest } from './diagtest';

describe('Diagtest', () => {
  let component: Diagtest;
  let fixture: ComponentFixture<Diagtest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagtest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diagtest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
