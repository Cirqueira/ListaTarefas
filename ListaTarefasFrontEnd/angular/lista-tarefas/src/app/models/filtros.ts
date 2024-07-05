import { Util } from "../utils/utils";

export class Filtros {
  constructor(completa: boolean = false, incompleta: boolean = false,
    dataVencimentoInicial: string = "", dataVencimentoFinal: string = "")
  {
    this.completa = Util.TryValue(completa, "boolean");
    this.incompleta = Util.TryValue(incompleta, "boolean");
    this.dataVencimentoInicial = Util.TryValue(dataVencimentoInicial, "string");
    this.dataVencimentoFinal = Util.TryValue(dataVencimentoFinal, "string");
  }

  completa: boolean;
  incompleta: boolean;
  dataVencimentoInicial: string;
  dataVencimentoFinal: string;
}
