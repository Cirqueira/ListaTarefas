import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-label',
  templateUrl: './checkbox-label.component.html',
  styleUrls: ['./checkbox-label.component.css']
})
export class CheckboxLabelComponent implements OnInit {
  @Input() idText: string = '';
  @Input() typeText: string = 'checkbox';
  @Input() labelText: string = '';
  //@Input() forText: string = '';
  // <input id="incompletasCheckbox" type="checkbox" value="">
  // <label class="form-check-label" for="incompletasCheckbox">
  //   Incompletas
  // </label>

  constructor() { }

  ngOnInit(): void {
  }

}
