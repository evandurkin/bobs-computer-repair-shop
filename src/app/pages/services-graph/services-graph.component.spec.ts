import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesGraphComponent } from './services-graph.component';

describe('ServicesGraphComponent', () => {
  let component: ServicesGraphComponent;
  let fixture: ComponentFixture<ServicesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
