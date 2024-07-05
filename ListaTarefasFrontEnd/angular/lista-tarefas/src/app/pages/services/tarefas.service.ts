import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tarefas } from "../../models/tarefas";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class TarefasService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  adicionarAsync(tarefa: Tarefas): Promise<any> {
    return this.http
      .post(this.UrlService + 'Tarefa/AdicionarAsync', tarefa, this.ObterHeaderAuthorizationJson())
      .toPromise();
  }

  atualizarAsync(tarefa: Tarefas): Promise<any> {
    return this.http
      .put(this.UrlService + 'Tarefa/AtualizarAsync', tarefa, this.ObterHeaderAuthorizationJson())
      .toPromise();
  }

  apagarAsync(tarefaId: number): Promise<any> {
    return this.http
      .put(this.UrlService + "Tarefa/ApagarAsync/" + tarefaId, null, this.ObterHeaderAuthorizationJson())
      .toPromise();
  }

  obterPorIdAsync(tarefaId: number): Promise<any> {
    return this.http
      .get(`${this.UrlService}Tarefa/ObterPorIdAsync/${tarefaId}`, this.ObterHeaderAuthorizationJson())
      .toPromise();
  }

  obterListaAsync(completa: boolean, incompleta: boolean, datainicio: Date | null, datafim: Date | null): Promise<any> {
    let endpoint = "Tarefa/ObterListaAsync";

    if ((completa != false) || (incompleta != false) || ((datainicio != null) && (datafim != null))) {
      endpoint += "?";
    }

    if (completa != false) {
      if (endpoint.length == 23) {
        endpoint += "completa="+completa;
      }
    }

    if (incompleta != false) {
      if (endpoint.length > 23) {
        endpoint += "&incompleta="+incompleta;
      } else {
        endpoint += "incompleta="+incompleta;
      }
    }

    if ((datainicio != null) && (datafim != null)) {
      if (endpoint.length > 23) {
        endpoint += "&datainicio="+datainicio;
        endpoint += "&datafim="+datafim;
      } else {
        endpoint += "datainicio="+datainicio;
        endpoint += "&datafim="+datafim;
      }
    }

    return this.http
      .get(this.UrlService + endpoint, this.ObterHeaderAuthorizationJson())
      .toPromise();
  }
}
