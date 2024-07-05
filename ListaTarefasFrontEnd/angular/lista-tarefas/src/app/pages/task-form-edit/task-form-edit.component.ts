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
  selector: 'app-task-form-edit',
  templateUrl: './task-form-edit.component.html',
  styleUrls: ['./task-form-edit.component.css'],
  providers: [DatePipe]
})

export class TaskFormEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errors: any[] = [];
  taskformeditForm!: FormGroup;
  tarefa: Tarefas;

  dataAtualFormatada: any;
  dataVencimentoBd: any;
  dataVencimentoNew: any;
  dataAtual: any;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  mudouDataVencimento: boolean = false;

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

    this.tarefa = this.route.snapshot.data['tarefa'];
    this.tarefa.dataVencimento = this.datePipe.transform(this.tarefa.dataVencimento, 'yyyy-MM-dd')!;
  }

  ngOnInit(): void {
    this.dataAtual = new Date();

    this.taskformeditForm = this.fb.group({
      id: '',
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dataVencimento: [null],
      completa: '',
    });

    // Colocar o foco de volta no campo titulo
    const inputElement = document.getElementById('titulo') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }

    this.preencherForm();
  }

  preencherForm() {
    this.taskformeditForm.patchValue({
      id: this.tarefa.id,
      titulo: this.tarefa.titulo,
      descricao: this.tarefa.descricao,
      dataVencimento: this.tarefa.dataVencimento,
      completa: this.tarefa.completa,
    });
  };

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.taskformeditForm);
    });

    this.mudancasNaoSalvas = true;

    const data = document.getElementById('dataVencimento') as HTMLInputElement;
    data.min = new Date().toISOString().split("T")[0];

    this.dataVencimentoBd = this.tarefa.dataVencimento; //atribuindo valor do BD.
    this.dataVencimentoNew = this.taskformeditForm.value['dataVencimento'];
    if (this.dataVencimentoBd !== this.tarefa.dataVencimento)
      this.mudouDataVencimento = true;
  }

  atualizarTarefa(){
    if ((this.taskformeditForm.dirty || this.mudouDataVencimento) && this.taskformeditForm.valid)  {
      this.tarefa = Object.assign({}, this.tarefa, this.taskformeditForm.value);

      this.dataVencimentoNew = this.taskformeditForm.value['dataVencimento'];
      if (this.ehVencimentoValido(this.dataVencimentoBd, this.dataVencimentoNew)) {
        this.tarefasService.atualizarAsync(this.tarefa)
        .then(response => {
          this.processarSucesso(response);
          this.mudancasNaoSalvas = false;
          this.mudouDataVencimento = false;
        })
        .catch(error => {
          console.error('Erro: ', error);
          this.processarFalha(error);
        });
      }
    }
  }

  ehVencimentoValido(dataVencimentoBd: string, dataVencimentoNova: string): boolean {
    this.dataAtualFormatada = this.datePipe.transform(this.dataAtual, 'yyyy-MM-dd')

    if (dataVencimentoBd !== dataVencimentoNova) {
      if (dataVencimentoNova === '') {
        this.toastr.warning('A data de vencimento não pode ser removida.');

        const inputElement = document.getElementById('dataVencimento') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
        return false;
      }
      else
      if (dataVencimentoNova < this.dataAtualFormatada) {
        this.toastr.warning('A data de vencimento não pode ser menor que hoje.');

        const inputElement = document.getElementById('dataVencimento') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
        return false;
      }
    }
    return true;
  }

  processarSucesso(response: any) {
    this.taskformeditForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Tarefa atualizada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/task-list']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  cancelar(){
    this.router.navigate(['/task-list']);
  }
}
