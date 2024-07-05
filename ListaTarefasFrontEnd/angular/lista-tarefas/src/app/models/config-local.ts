export class ConfigLocal {

  constructor() { }

  public static Obter(): ConfigLocal {
    return localStorage.getItem("configlocal") == null
      ? new ConfigLocal()
      : JSON.parse(atob(localStorage.getItem("configlocal"))) as ConfigLocal;
  }
}
