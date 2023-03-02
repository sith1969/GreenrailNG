import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmgsDetailComponent } from './smgs-detail.component';

describe('SmgsDetailComponent', () => {
  let component: SmgsDetailComponent;
  let fixture: ComponentFixture<SmgsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmgsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmgsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
