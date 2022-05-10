import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionEditComponent } from './security-question-edit.component';

describe('SecurityQuestionEditComponent', () => {
  let component: SecurityQuestionEditComponent;
  let fixture: ComponentFixture<SecurityQuestionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
