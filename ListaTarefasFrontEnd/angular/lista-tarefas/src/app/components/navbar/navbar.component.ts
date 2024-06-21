import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() routerBack!: string[];
  @Input() routerNew!: string[];
  @Input() labelTitle!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.router.navigate(this.routerBack);
  }

  navigateNew() {
    this.router.navigate(this.routerNew);
  }

}
