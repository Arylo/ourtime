import { ulid, isValid } from "ulidx";
import { DataInst, DataType } from "./base"

export class IDDataType extends DataType<string> {
  public validate(value: string) {
    return isValid(value)
  }
  public generateInst (initValue = ulid()) {
    return new IDDataInst({
      value: initValue,
      validate: this.validate,
    });
  }
  public static createDataType() {
    return new IDDataType()
  }
}

class IDDataInst extends DataInst<string> {}
