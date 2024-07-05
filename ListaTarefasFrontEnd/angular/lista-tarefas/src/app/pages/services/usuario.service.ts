import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../models/usuario";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class UsuarioService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  logar(usuario: Usuario) : Promise<any> {
    return this.http
      .post(this.UrlService + 'Auth/Logar', usuario, this.ObterHeaderJson()).toPromise();
  }
}
