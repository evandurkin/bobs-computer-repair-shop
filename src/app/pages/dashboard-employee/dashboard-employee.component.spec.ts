/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 22 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the dashboard-employee component.
=======================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeComponent } from './dashboard-employee.component';

describe('DashboardEmployeeComponent', () => {
  let component: DashboardEmployeeComponent;
  let fixture: ComponentFixture<DashboardEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
