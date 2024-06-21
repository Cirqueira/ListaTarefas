import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker-label',
  templateUrl: './datepicker-label.component.html',
  styleUrls: ['./datepicker-label.component.css']
})
export class DatepickerLabelComponent implements OnInit {
  @Input() placeholderText: string = 'yyyy/mm/dd';
  @Input() idText: string = '';
  @Input() typeText: string = 'text';
  @Input() formControlNameText: string = '';
  @Input() nameText: string = '';
  @Input() labelText: string = '';

  model: any;
  date: any;

  constructor() { }

  ngOnInit(): void {
  }

}
