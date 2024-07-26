import { DataInst, DataType } from "./base"

export class ObjectDataType extends DataType<object> {
  public validate(value: object) {
    return typeof value === 'object' && !Array.isArray(value)
  }
  public generateInst(initValue: object){
    return new ObjectDataInst({
      value: initValue,
      validate: this.validate,
    });
  }
  public static createDataType() {
    return new ObjectDataType()
  }
}

class ObjectDataInst extends DataInst<object> {}
