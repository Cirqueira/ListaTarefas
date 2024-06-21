import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from 'src/app/pages/login/services/usuario.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Usuario } from 'src/app/models/usuario';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  [x: string]: any;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  loginForm!: FormGroup;
  usuario!: Usuario;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService)
  {
    this.validationMessages = {
      email: { required: 'O email é obrigatório.' },
      senha: { required: 'A senha é obrigatória.' }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
      // this.mudancasNaoSalvas = true;
    });
  }

  logar() {
    console.log('Método "LOGAR": ', this.loginForm.value);
    // this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuarioService.login(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.usuarioService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.router.navigate(['/task-list']);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);

  }

  // método temporario, apenas para teste
  abrirTaskList() {
    this.router.navigate(['/task-list']);
  }
}
