import { Util } from "../utils/utils";

export class Tarefas {
  constructor(id: number = 0, titulo: string = "", descricao: string = "",
    dataVencimento: string = "", completa: boolean = false)
  {
    this.id = Util.TryValue(id, "number");
    this.titulo = Util.TryValue(titulo, "string");
    this.descricao = Util.TryValue(descricao, "string");
    this.dataVencimento = Util.TryValue(dataVencimento, "string");
    this.completa = Util.TryValue(completa, "boolean");
  }

  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: string;
  completa: boolean;
}
