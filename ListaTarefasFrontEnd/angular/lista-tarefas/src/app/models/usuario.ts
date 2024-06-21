import { Util } from "../utils/utils";

export class Usuario {
  constructor(id: number = 0, email: string = "", password: string = "") {
    this.Id = Util.TryValue(id, "number");
    this.Email = Util.TryValue(email, "string");
    this.Password = Util.TryValue(password, "number");
  }

  Id: number;
  Email: string;
  Password: string;
}
