import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() routerBack!: string[];
  @Input() routerNew!: string[];
  @Input() labelTitle!: string;
  @Input() exibirAdd: boolean = true;
  @Input() backButton!: () => void;

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.router.navigate(this.routerBack);
  }

  navigateNew() {
    this.router.navigate(this.routerNew);
  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout() {
    if (window.confirm('Tem certeza que deseja sair?')) {
      this.localStorageUtils.limparDadosLocaisUsuario();
      this.router.navigate(['/login']);
    }
  }

}
