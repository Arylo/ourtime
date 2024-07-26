import { DataInst, DataType } from "./base"

export class DateDataType extends DataType<Date> {
  public validate(value: Date | string) {
    return value instanceof Date ||
      typeof value === 'string' && !isNaN(Date.parse(value))
  }
  public generateInst(initValue: Date | string){
    return new DateDataInst({
      value: typeof initValue === 'string' ? new Date(initValue) : initValue,
      validate: this.validate,
    });
  }
  public static createDataType() {
    return new DateDataType()
  }
}

class DateDataInst extends DataInst<Date> {}
