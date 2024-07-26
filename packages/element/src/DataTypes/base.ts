import { OrEnum } from "../types"

interface DataTypeInstConstructorOptions<Type> {
  value: Type,
  validate: (value: Type) => boolean
}

export abstract class DataType<Type, DefaultType = Type> {
  protected constructor () {}
  protected abstract validate(value: OrEnum<Type, DefaultType>): boolean;
  public abstract generateInst(data: OrEnum<Type, DefaultType>): DataInst<OrEnum<Type, DefaultType>>;
}

export abstract class DataInst<Type> {
  protected curValue: Type
  private validate: (value: Type) => boolean
  constructor (opts: DataTypeInstConstructorOptions<Type>) {
    this.curValue = opts.value
    this.validate = opts.validate
  }
  public set(val: Type) {
    if (!this.validate(val)) {
      throw new Error('Invalid value')
    }
    this.curValue = val
  }
  public get() {
    return this.curValue
  }
}
