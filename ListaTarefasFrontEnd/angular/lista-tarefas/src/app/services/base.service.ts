import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";
import { environment } from "src/environments/environment";

export abstract class BaseService {
  protected UrlService: string = environment.apiUrl;
  public LocalStorage = new LocalStorageUtils();

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  protected ObterHeaderAuthorizationJson() {
    const token = this.LocalStorage.obterTokenUsuario();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token == null ? "" : atob(token)}`
        //'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    };
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === "Unknown Error") {
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }
    console.error(response);
    return throwError(response);
  }
}
