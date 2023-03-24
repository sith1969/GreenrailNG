import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastHelpComponent } from './fast-help.component';

describe('FastHelpComponent', () => {
  let component: FastHelpComponent;
  let fixture: ComponentFixture<FastHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
