/*
============================================================
// Title: Bob’s Computer Repair Shop
// Date: 23 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: spec.ts file for delete user pop-up Component
============================================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordDialogComponent } from './delete-record-dialog.component';

describe('DeleteRecordDialogComponent', () => {
  let component: DeleteRecordDialogComponent;
  let fixture: ComponentFixture<DeleteRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRecordDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
