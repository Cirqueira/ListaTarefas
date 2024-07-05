import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/pages/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  loginForm!: FormGroup;
  usuario!: Usuario;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  localStorageUtils = new LocalStorageUtils();

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService)
  {
    this.validationMessages = {
      email: { required: 'O email é obrigatório.' },
      password: { required: 'A senha é obrigatória.' }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.errors = [];

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Colocar o foco de volta no campo email
    const inputElement = document.getElementById('email') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  logar() {
    this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuarioService.logar(this.usuario)
      .then(response => {
        this.processarSucesso(response);
      })
      .catch(error => {
        console.error('Erro ao fazer login', error);
        this.processarFalha(error);
      });
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];
    this.usuarioService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toastr = this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');
      if (toastr){
        toastr.onHidden.subscribe(()=> {
          this.router.navigate(['/task-list']);
        });
      }
  }

  processarFalha(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
