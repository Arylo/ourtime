import { DataType } from "./DataTypes/base"

export type ModelSchemaItem<T extends DataType<any> = DataType<any>> = {
  type: T,
  auto?: boolean,
  optional?: boolean,
}

export type DefineModelParam = {
  [key: string]: DataType<any> | ModelSchemaItem
}

export type Model<M extends DefineModelParam = DefineModelParam> = {
  [key in keyof M & string]:
    M[key] extends ModelSchemaItem ? M[key] :
    M[key] extends DataType<any> ? ModelSchemaItem<M[key]> :
    never
}

export const defineModel = <T extends DefineModelParam>(model: T) => {
  return Object.entries(model)
    .reduce<Model<any>>((m, [key, value]) => {
      if (value instanceof DataType) {
        m[key] = { type: value }
      } else {
        m[key] = value
      }
      return m
    }, {}) as Model<T>
}
