import { Util } from "../utils/utils";

export class Tarefas {
  constructor(id: number = 0, titulo: string = "", descricao: string = "",
    datavencimento: string = "", completa: boolean = false)
  {
    this.Id = Util.TryValue(id, "number");
    this.Titulo = Util.TryValue(titulo, "string");
    this.Descricao = Util.TryValue(descricao, "string");
    this.DataVencimento = Util.TryValue(datavencimento, "string");
    this.Completa = Util.TryValue(completa, "boolean");
  }

  Id: number;
  Titulo: string;
  Descricao: string;
  DataVencimento: string;
  Completa: boolean;
}
