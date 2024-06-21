import { AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Tarefas } from 'src/app/models/tarefas';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import { NgForm } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  taskformForm!: FormGroup;
  tarefas!: Tarefas;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
              private toastr: ToastrService)
  {
  // constructor(public dialogRef: MatDialogRef<TaskFormComponent>) {

    this.validationMessages = {
      titulo: {
        required: 'O titulo é obrigatório.',
      },
      descricao: {
        required: 'A descrição é obrigatória.',
      },
      // Todo: Caso novo registro => Validar a DataVencimento não ser menor que o dia atual.
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.taskformForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      datavencimento: [''],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.taskformForm);
      // this.mudancasNaoSalvas = true;
    });
  }

  adicionar(){
    console.log('método "ADICIONAR": ', this.taskformForm.value);

    if (this.taskformForm.dirty && this.taskformForm.valid) {
      this.tarefas = Object.assign({}, this.tarefas, this.taskformForm.value);
    }
  }

  cancelar(){
    console.log('método "CANCELAR": fechar modal.')
  }

  // cancel(): void {
  //   this.dialogRef.close();
  // }

  // adicionarTarefa() {
  //   this.tarefas = Object.assign({}, this.tarefas, this.taskformForm.value);
  // }

}

// Todo: Método que adiciona novo registro ao Array do TaskList
// onSubmit(form: NgForm) {
//   console.log(form);

//   this.taskArray.push({
//     taskName: form.controls['task'].value,
//     isCompleted: false
//   })

//   form.reset();
// }
