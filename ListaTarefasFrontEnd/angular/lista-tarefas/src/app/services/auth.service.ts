import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, } from "@angular/common/http";
import { throwError } from "rxjs";

export interface Usuario {
  id: number;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private ls = window.localStorage;

  private apiUrl = 'https://localhost:5001/api/Auth/Logar';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    // Handle the error accordingly
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Método para obter o token
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Método para deslogar
  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
