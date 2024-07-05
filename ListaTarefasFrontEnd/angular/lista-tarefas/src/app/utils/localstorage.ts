export class LocalStorageUtils {

  public obterUsuario() {
    return JSON.parse(localStorage.getItem('tasklist.user')!);
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.acessToken);
    // this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('tasklist.token');
    localStorage.removeItem('tasklist.user');
  }

  public obterTokenUsuario(): string {
    let tokenRetorno = localStorage.getItem('tasklist.token')!;
    return localStorage.getItem('tasklist.token')!;
  }

  public salvarTokenUsuario(token: string) {
    const base64Encoded = btoa(token);
    localStorage.setItem('tasklist.token', base64Encoded);
  }

  public salvarUsuario(user: string) {
     localStorage.setItem('tasklist.user', JSON.stringify(user));
  }
}

