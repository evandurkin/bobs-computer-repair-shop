import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePasswordComponent } from './edit-profile-password.component';

describe('EditProfilePasswordComponent', () => {
  let component: EditProfilePasswordComponent;
  let fixture: ComponentFixture<EditProfilePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
