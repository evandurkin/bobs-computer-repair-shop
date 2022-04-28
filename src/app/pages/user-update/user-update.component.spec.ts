/*
============================================
// Title: Bob’s Computer Repair Shop
// Date: 21 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the user-update component.
============================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
