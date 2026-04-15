import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabView } from './lab-view';

describe('LabView', () => {
  let component: LabView;
  let fixture: ComponentFixture<LabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabView],
    }).compileComponents();

    fixture = TestBed.createComponent(LabView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
