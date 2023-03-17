import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsmgsDetailComponent } from './cimsmgs-detail.component';

describe('CimsmgsDetailComponent', () => {
  let component: CimsmgsDetailComponent;
  let fixture: ComponentFixture<CimsmgsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CimsmgsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimsmgsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
