import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { TaskFormEditComponent } from "../task-form-edit.component";

@Injectable()
export class TaskFormEditGuard  implements CanDeactivate<TaskFormEditComponent>{

  canDeactivate(component: TaskFormEditComponent) {
    //Verifica se houve alteração do Form, e pergunta se deseja abandonar as alterações
    if(component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar a edição do formulário?');
  }

  return true
  }

}
