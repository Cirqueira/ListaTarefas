import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
   tasklistForm!: FormGroup;

  taskArray = [
    { id: 1, titulo: 'Tarefa 01', descricao: 'descricao 01', datavencimento: '01/01/2020', completa: false },
    { id: 2, titulo: 'Tarefa 02', descricao: 'descricao 02', datavencimento: '01/01/2020', completa: false },
    { id: 3, titulo: 'Tarefa 03', descricao: 'descricao 03', datavencimento: '01/01/2020', completa: false },

    // { titulo: 'Tarefa 01', descricao: 'descricao 01', datavencimento: '01/01/2020', completa: false },
    // { titulo: 'Tarefa 02', descricao: 'descricao 02', datavencimento: '01/01/2020', completa: false },
    // { titulo: 'Tarefa 03', descricao: 'descricao 03', datavencimento: '01/01/2020', completa: false },
  ];
  // editIndex: number | null = null;
  // private idCounter: number = 4;

  // constructor(public dialog: MatDialog) { }
  // constructor(private fb: FormBuilder) { }
  constructor(private toastr: ToastrService)
  {
    //
  }

  ngOnInit(): void {
    // this.tasklistForm = this.fb.group({
    //   datavencimentoInicial: ['', [Validators.required]],
    //   datavencimentoFinal: ['', [Validators.required]],
    // })
   }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(TaskFormComponent, {
  //     // maxHeight: '95vh',
  //     minWidth: '400px',
  //     // width: '25vw',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // window.location.reload();
  //   });
  // }


  // addOrUpdate() {
  //   if (this.editIndex === null) {
  //     // Adicionar novo item

  //   } else {
  //     // Editar item existente
  //     this.taskArray[this.editIndex] = this.myForm.value;
  //     this.editIndex = null;
  //   }
  //   this.myForm.reset();
  // }

  // editItem(index: number) {
  //   this.editIndex = index;
  //   this.myForm.setValue(this.taskArray[index]);
  // }


  // getDataById(index: number) {
  //   // return this.taskArray.find(item => item.id === index);
  // }

  // onSubmit(form: NgForm) {
  //   if (this.editIndex === null) {

  //   this.taskArray.push({
  //     id: this.idCounter++,
  //     titulo: form.controls['titulo'].value,
  //     descricao: form.controls['descricao'].value,
  //     datavencimento: form.controls['datavencimento'].value,
  //     completa: false
  //   })
  // } else {
// Todo: Implementar edição.
/*
FindById (getDataById) -> passar como parametro o index.
Popular os inputs com os dados do FindById (getDataById)
*/

    // Editar item existente
    // this.taskArray[this.editIndex] = form.controls.get;
  //   this.editIndex = null;
  // }
  //   form.reset();
  // }
  // onSubmit(form: NgForm) {
  //   console.log(form);

  //   this.taskArray.push({
  //     id: this.idCounter++,
  //     titulo: form.controls['titulo'].value,
  //     descricao: form.controls['descricao'].value,
  //     datavencimento: form.controls['datavencimento'].value,
  //     completa: false
  //   })

  //   form.reset();
  // }

//   onEdit(index: number) {

//     console.log(index);
// //Todo: criar método Edit
//     // this.taskArray.splice(index, 1);
//   }

//   onDelete(index: number) {
//     console.log(index);
// //Todo: criar método Deletar
//     // this.taskArray.splice(index, 1);
//   }

  // onCheck(index: number) {
  //   console.log(this.taskArray);

  //   this.taskArray[index].completa = !this.taskArray[index].completa;
  // }

  // adicionarTarefa(): void {
  //   const dialogRef = this.dialog.open(TaskFormComponent, {
  //     // maxHeight: '95vh',
  //     minWidth: '400px',
  //     // width: '25vw',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // window.location.reload();
  //   });
  // }
}
