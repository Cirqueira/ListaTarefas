import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { TaskFormComponent } from "../task-form.component";

@Injectable()
export class TaskFormGuard  implements CanDeactivate<TaskFormComponent>{

  canDeactivate(component: TaskFormComponent) {
    //Verifica se houve alteração do Form, e pergunta se deseja abandonar as alterações
    if(component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
  }

  return true
  }

}
