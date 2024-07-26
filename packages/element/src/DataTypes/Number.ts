import { DataInst, DataType } from "./base"

export class NumberDataType extends DataType<number> {
  public validate(value: number) {
    return typeof value === 'number'
  }
  public generateInst(initValue: number){
    return new NumberDataInst({
      value: initValue,
      validate: this.validate,
    });
  }
  public static createDataType() {
    return new NumberDataType()
  }
}

class NumberDataInst extends DataInst<number> {}
