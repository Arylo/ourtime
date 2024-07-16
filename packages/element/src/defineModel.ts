import { DataType } from "./DataTypes"

type ShortModelSchemaItem = DataType
type FullModelSchemaItem = {
  type: DataType,
  auto?: boolean,
  optional?: boolean,
}

export type ModelSchema = {
  [key: string]: ShortModelSchemaItem | FullModelSchemaItem
}
type DefineModelParam = ModelSchema

export type Model<M extends DefineModelParam> = {
  [key in keyof M]: M[key] extends ShortModelSchemaItem ? { type: M[key] } : M[key]
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
