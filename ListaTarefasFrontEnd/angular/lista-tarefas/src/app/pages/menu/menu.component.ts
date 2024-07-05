import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  token: string = "";
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/login']);
  }

}
