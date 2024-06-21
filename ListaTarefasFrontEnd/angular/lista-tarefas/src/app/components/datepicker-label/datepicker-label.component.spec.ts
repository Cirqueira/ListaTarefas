import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerLabelComponent } from './datepicker-label.component';

describe('DatepickerLabelComponent', () => {
  let component: DatepickerLabelComponent;
  let fixture: ComponentFixture<DatepickerLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
