import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Tarefas } from "../../models/tarefas";
import { TarefasService } from "../services/tarefas.service";

@Injectable({
  providedIn: 'root'
})
export class TarefasResolve implements Resolve<Tarefas> {

  constructor (private tarefasService: TarefasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Tarefas> {
    const id = route.paramMap.get('id');
      return this.tarefasService.obterPorIdAsync(route.params['id']);
  }
}
