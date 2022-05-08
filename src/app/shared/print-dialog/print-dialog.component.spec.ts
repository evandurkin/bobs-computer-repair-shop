/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the print-dialog component.
=======================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDialogComponent } from './print-dialog.component';

describe('PrintDialogComponent', () => {
  let component: PrintDialogComponent;
  let fixture: ComponentFixture<PrintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
