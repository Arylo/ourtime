import { OrEnum } from "../types"
import { DataInst, DataType } from "./base"

export class StringDataType<R> extends DataType<R, string> {
  private constructor (enumValues: R);
  private constructor ();
  private constructor (private enumValues?: R) {
    super()
  }

  protected validate(value: OrEnum<R, string>) {
    if (!this.enumValues) {
      return typeof value === 'string'
    } else {
      return Object.values(this.enumValues).includes(value)
    }
  }

  public generateInst(initValue: OrEnum<R, string>) {
    return new StringDataInst<OrEnum<R, string>>({
      value: initValue,
      validate: this.validate,
    })
  }

  public static createDataType<R extends Record<string, string>>(enumValues: R): StringDataType<R>;
  public static createDataType(): StringDataType<string>;
  public static createDataType<R extends Record<string, string>>(enumValues?: R) {
    if (enumValues) {
      return new StringDataType(enumValues)
    }
    return new StringDataType<string>()
  }
}

class StringDataInst<T> extends DataInst<T> {}

enum EE {
  A = 'A',
  B = 'B',
}

StringDataType.createDataType(EE).generateInst(EE.A).get()

StringDataType.createDataType().generateInst('A').get()
