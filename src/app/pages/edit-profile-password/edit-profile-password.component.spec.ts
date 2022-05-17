/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 16 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the edit-profile-profile component.
============================================
*/

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
