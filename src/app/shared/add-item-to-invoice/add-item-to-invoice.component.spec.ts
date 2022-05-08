/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 07 May 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Test file for the add-item-to-invoice component.
=======================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToInvoiceComponent } from './add-item-to-invoice.component';

describe('AddItemToInvoiceComponent', () => {
  let component: AddItemToInvoiceComponent;
  let fixture: ComponentFixture<AddItemToInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemToInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemToInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
