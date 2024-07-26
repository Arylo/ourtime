import { DataInst, DataType } from "./base"

export class BooleanDataType extends DataType<boolean> {
  public validate(value: boolean) {
    return typeof value === 'boolean'
  }
  public generateInst (initValue: boolean) {
    return new BooleanDataInst({
      value: initValue,
      validate: this.validate,
    });
  }
  public static createDataType() {
    return new BooleanDataType()
  }
}

class BooleanDataInst extends DataInst<boolean> {
}
