import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileUsernameComponent } from './edit-profile-username.component';

describe('EditProfileUsernameComponent', () => {
  let component: EditProfileUsernameComponent;
  let fixture: ComponentFixture<EditProfileUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
