import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGroupsEdit } from './test-groups-edit';

describe('TestGroupsEdit', () => {
  let component: TestGroupsEdit;
  let fixture: ComponentFixture<TestGroupsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestGroupsEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGroupsEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
