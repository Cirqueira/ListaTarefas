import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';
import { ToastrService } from 'ngx-toastr';
import { Tarefas } from 'src/app/models/tarefas';
import { TarefasService } from '../services/tarefas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [DatePipe]
})

// TODO: Implementar Guarda de Rota para evitar sair do Formulario se o mesmo estiver em preenchimento
export class TaskFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errors: any[] = [];
  taskformForm!: FormGroup;
  tarefas!: Tarefas;
  dataVencimento: any;
  dataAtual = new Date();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean = false;

  constructor(private fb: FormBuilder,
              private tarefasService: TarefasService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private datePipe: DatePipe )
  {
    this.validationMessages = {
      titulo: { required: 'O titulo é obrigatório.',  },
      descricao: { required: 'A descrição é obrigatória.',  },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.taskformForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataVencimento: [null],
    });

    // Colocar o foco de volta no campo titulo
    const inputElement = document.getElementById('titulo') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.taskformForm);
    });

    this.mudancasNaoSalvas = true;

    const data = document.getElementById('dataVencimento') as HTMLInputElement;
    data.min = new Date().toISOString().split("T")[0];
  }

  ehVencimentoValido(data: string) {
    const dataAtualFormatada = this.datePipe.transform(this.dataAtual, 'yyyy-MM-dd');

    if (data !== null) {
      if (data < dataAtualFormatada!) {
        this.toastr.warning('A data de vencimento não pode ser menor que hoje.');
        return false;
      }
    }
    return true;
  }

  adicionarTarefa(){
    if (this.taskformForm.dirty && this.taskformForm.valid) {
      this.tarefas = Object.assign({}, this.tarefas, this.taskformForm.value);

      if (this.tarefas.dataVencimento === '' || this.tarefas.dataVencimento === undefined)
        this.dataVencimento = null;

      if (this.ehVencimentoValido(this.tarefas.dataVencimento)) {
        this.tarefasService.adicionarAsync(this.tarefas)
          .then(response => {
            this.processarSucesso();
            this.mudancasNaoSalvas = false;

            let toastr = this.toastr.success('Registro criado com sucesso.');
            if (toastr){
              toastr.onHidden.subscribe(()=> {
                this.router.navigate(['/task-list']);
              });
            }
          })
          .catch(error => {
            console.error('Erro: ', error);
            this.processarFalha(error);
          });
      }
    }
  }

  processarSucesso() {
    this.taskformForm.reset();
    this.errors = [];
  }

  processarFalha(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  cancelar(){
    this.router.navigate(['/task-list']);
  }
}
