import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestServicesComponent } from './guest-services.component';

describe('GuestServicesComponent', () => {
  let component: GuestServicesComponent;
  let fixture: ComponentFixture<GuestServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
