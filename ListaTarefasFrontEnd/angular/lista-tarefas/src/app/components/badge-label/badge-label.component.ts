import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-label',
  templateUrl: './badge-label.component.html',
  styleUrls: ['./badge-label.component.css']
})
export class BadgeLabelComponent implements OnInit {
  @Input() classText: string = '';
  @Input() labelText: string = '';

  status: string;

  constructor() {
    this.status = 'default'; // Defina o valor inicial do status aqui
  }

  ngOnInit(): void {  }

  mudarStatus(novoStatus: string) {
    this.status = novoStatus;
  }

}
