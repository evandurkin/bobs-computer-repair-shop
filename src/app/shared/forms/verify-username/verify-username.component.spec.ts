import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUsernameComponent } from './verify-username.component';

describe('VerifyUsernameComponent', () => {
  let component: VerifyUsernameComponent;
  let fixture: ComponentFixture<VerifyUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
