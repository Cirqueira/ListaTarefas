import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarefas } from 'src/app/models/tarefas';
import { TarefasService } from '../services/tarefas.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  tarefas: Tarefas[] = [];

  filtersForm!: FormGroup; //remover?
  filtros: any = {}; //novo?

  completa: boolean = false;
  incompleta: boolean = false;
  dataInicioVencimento: any;
  dataFimVencimento: any;
  dataAtual = new Date();
  sairTela: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarefaService: TarefasService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private stateService: StateService) { }

  ngOnInit(): void {

    //remover?
    this.filtersForm = this.fb.group({
      completa: [false],
      incompleta: [false],
      dataInicioVencimento: [null],
      dataFimVencimento: [null],
    });

    //novo?
    const savedState = this.stateService.getState('task-list');
    if (savedState) {
      //this.filtros = savedState;
      //this.filtersForm = savedState;

      this.restaurarFiltros(savedState);
    } else {
      this.obterListaAsync();
    }
  }

  restaurarFiltros(savedState: any) {
    console.log('Restaurando filtros com:', savedState);

    this.filtersForm.patchValue({
      completa: savedState.value['completa'],
      incompleta: savedState.value['incompleta'],
      dataInicioVencimento: savedState.value['dataInicioVencimento'],
      dataFimVencimento: savedState.value['dataFimVencimento'],
    });

    this.atualizarExibicao(
      this.completa,
      this.incompleta,
      this.dataInicioVencimento,
      this.dataFimVencimento
    );

    console.log('Valores do formulário após restaurar:', this.filtersForm.value);
  }

  ngAfterViewInit(): void {
    this.sairTela = true;
  }

  ngOnDestroy(): void {
    this.saveState();
  }

  saveState(): void {
    //this.stateService.setState('task-list', this.filtros);
    this.stateService.setState('task-list', this.filtersForm);
  }

  ehDataVencida(item: any): boolean {
    const dataVencimentoDate = new Date(item.dataVencimento);

    dataVencimentoDate.setHours(0, 0, 0, 0);
    this.dataAtual.setHours(0, 0, 0, 0);

    if (!item.completa) {
      if (dataVencimentoDate < this.dataAtual) {
        return true;
      }
    }
    return false;
  }

  onCheckboxChange(tarefa: Tarefas) {
    tarefa.completa = !tarefa.completa;

    this.tarefaService.atualizarAsync(tarefa)
      .then(response => {
        this.processarSucesso(response, 'Sucesso!', 'Tarefa atualizada com sucesso!');
      })
      .catch(error => {
        console.error('Erro: ', error);
        this.processarFalha(error);
      });
  }

  obterListaAsync() {
    this.tarefaService.obterListaAsync(false, false, null, null)
      .then(response => {
        this.tarefas = response;
      })
      .catch(error => {
        console.error('Erro: ', error);
      });
  }

  inserirTarefa() {
    this.router.navigate(['/task-form']);
  }

  editarTarefa(id: number) {
    this.router.navigate(['/task-form-edit', id]);
  }

  deletarTarefa(id: number) {
    this.tarefaService.apagarAsync(id)
      .then(response => {
        this.processarSucesso(response, 'Sucesso!', 'Registro removido com sucesso.');
      })
      .catch(error => {
        console.error('Erro: ', error);
        this.processarFalha(error);
      });
  }

  atualizarExibicao(completa: boolean, incompleta: boolean,
    dataInicioVencimento: Date, dataFimVencimento: Date)
  {
    this.tarefaService.obterListaAsync(completa, incompleta, dataInicioVencimento, dataFimVencimento)
      .then(response => {
        this.tarefas = response;
      })
      .catch(error => {
        console.error('Erro: ', error);
      });
  }

  processarSucesso(response: any, titleToast: string, messageToast: string) {
    this.errors = [];

    let toast = this.toastr.success(messageToast, titleToast);
    if (toast) {
      this.atualizarExibicao(this.completa, this.incompleta,
        this.dataInicioVencimento, this.dataFimVencimento);
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content: any, id: number) {
    const modalRef = this.modalService.open(content);

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.deletarTarefa(id);
      }
    });
  }

  aplicarFiltros() {
    if (this.dataInicioVencimento === undefined)
      this.dataInicioVencimento = null;

    if (this.dataFimVencimento === undefined)
      this.dataFimVencimento = null;

    if (this.ehValidoFiltroPeriodo(this.dataInicioVencimento, this.dataFimVencimento)) {
      this.atualizarExibicao(this.completa, this.incompleta,
        this.dataInicioVencimento, this.dataFimVencimento);
    }

    //novo?
    this.saveState();
  }

  removerFiltros () {
    this.completa = false;
    this.incompleta = false;
    this.dataInicioVencimento = null;
    this.dataFimVencimento = null;

    this.obterListaAsync();
  }

  ehValidoFiltroPeriodo(dataInicioVencimento: Date, dataFimVencimento: Date) {
    if (dataInicioVencimento !== null || dataFimVencimento !== null) {
      if (dataInicioVencimento === null) {
        let toastr = this.toastr.warning('Selecione o período inicial.', 'Atenção.');
        if (toastr) {
          toastr.onHidden.subscribe(() => {
            const inputElement = document.getElementById('dataInicioVencimento') as HTMLInputElement;
            if (inputElement) {
              inputElement.focus();
            }
          });
        }
        return false;
      }
      else if (dataFimVencimento === null) {
        let toastr = this.toastr.warning('Selecione o período final.', 'Atenção.');
        if (toastr) {
          toastr.onHidden.subscribe(() => {
            const inputElement = document.getElementById('dataFimVencimento') as HTMLInputElement;
            if (inputElement) {
              inputElement.focus();
            }
          });
        }
        return false;
      }
      else if (dataInicioVencimento > dataFimVencimento) {
        let toastr = this.toastr.warning('O periodo inicial não pode ser maior que o período final.', 'Atenção.');
        if (toastr) {
          toastr.onHidden.subscribe(() => {
            const inputElement = document.getElementById('dataInicioVencimento') as HTMLInputElement;
            if (inputElement) {
              inputElement.focus();
            }
          });
        }
        return false;
      }
    }
    return true;
  }
}
