import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMechanicComponent } from './find-mechanic.component';

describe('FindMechanicComponent', () => {
  let component: FindMechanicComponent;
  let fixture: ComponentFixture<FindMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindMechanicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
