import type { Values } from "./types"

export abstract class DataType {
  public abstract validate(value: unknown): boolean;
}

export class StringDataType<R> extends DataType {
  private constructor (enumValues: R);
  private constructor ();
  private constructor (private enumValues?: R) {
    super()
  }
  public validate(value: R extends Record<string, string> ? Values<R> : string) {
    if (!this.enumValues) {
      return typeof value === 'string'
    } else {
      return Object.values(this.enumValues).includes(value)
    }
  }

  public static createInstance<R extends Record<string, string>>(enumValues: R): StringDataType<R>;
  public static createInstance(): StringDataType<string>;
  public static createInstance<R extends Record<string, string>>(enumValues?: R) {
    if (enumValues) {
      return new StringDataType(enumValues)
    }
    return new StringDataType<string>()
  }
}
export class NumberDataType extends DataType {
  private constructor () {
    super()
  }
  public validate(value: any) {
    return typeof value === 'number'
  }
  public static createInstance() {
    return new NumberDataType()
  }
}
export class BooleanDataType extends DataType {
  private constructor () {
    super()
  }
  public validate(value: any) {
    return typeof value === 'boolean'
  }
  public static createInstance() {
    return new BooleanDataType()
  }
}
export class DateDataType extends DataType {
  private constructor () {
    super()
  }
  public validate(value: any) {
    return value instanceof Date
  }
  public static createInstance() {
    return new DateDataType()
  }
}
export class ObjectDataType extends DataType {
  private constructor () {
    super()
  }
  public validate(value: any) {
    return typeof value === 'object' && !Array.isArray(value)
  }
  public static createInstance() {
    return new ObjectDataType()
  }
}

export const DataTypes = {
  String: StringDataType.createInstance,
  Number: NumberDataType.createInstance,
  Boolean: BooleanDataType.createInstance,
  Date: DateDataType.createInstance,
  Object: ObjectDataType.createInstance,
} as const
