export class LocalStorageUtils {

  public obterUsuario() {
    return JSON.parse(localStorage.getItem('tasklist.user')!);
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('tasklist.token');
    localStorage.removeItem('tasklist.user');
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('tasklist.token')!;
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('tasklist.token', token);
  }

  public salvarUsuario(user: string) {
     localStorage.setItem('tasklist.user', JSON.stringify(user));
  }
}
