import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsmgsComponent } from './cimsmgs.component';

describe('CimsmgsComponent', () => {
  let component: CimsmgsComponent;
  let fixture: ComponentFixture<CimsmgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CimsmgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CimsmgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
