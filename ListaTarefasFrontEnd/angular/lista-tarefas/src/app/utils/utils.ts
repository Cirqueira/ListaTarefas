import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()


export class Util {

  static TryValue(value: any, type: string): any {
    if (type == "boolean")
      value = value == 1 ? true : value == 0 ? false : value;

    return value != null && value != "" ? value
      : type == "string" ? ""
        : type == "number" ? 0
          : type == "boolean" ? false
            : type == "blob" ? ""
              : null;
  }
}
