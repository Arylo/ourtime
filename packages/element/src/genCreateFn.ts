import type { Values } from "./types"
import { defineModel, type Model, type ModelSchemaItem } from "./defineModel"
import { BooleanDataType, DataTypes, DateDataType, IDDataType, NumberDataType, ObjectDataType, StringDataType } from "./DataTypes"

type TransformType<T> =
  T extends IDDataType ? string :
  T extends StringDataType<infer R> ? (R extends Record<string, string> ? Values<R> : string) :
  T extends NumberDataType ? number :
  T extends BooleanDataType ? boolean :
  T extends DateDataType ? Date :
  T extends ObjectDataType ? object :
  never

type AutoKeys<T extends Model> = {
  [K in keyof T]: T[K] extends { auto: true } ? K : never;
}[keyof T]

type RequiredKeys<T extends Model> = {
  [K in keyof T]: K extends AutoKeys<T> ? never : (T[K] extends { optional: true } ? never : K);
}[keyof T]

type OptionalKeys<T extends Model> = {
  [K in keyof T]: K extends AutoKeys<T> ? never : (T[K] extends { optional: true } ? K : never);
}[keyof T]

type CreateFnParam<T extends Model> = {
  [K in RequiredKeys<T>]: TransformType<T[K]['type']>;
} & {
  [K in OptionalKeys<T>]?: TransformType<T[K]['type']>;
}

type CreateFnResult<T extends Model> = {
  [K in AutoKeys<T>]: TransformType<T[K]['type']>;
} & CreateFnParam<T>

export const genCreateFn = <T extends Model>(model: T) => {
  return <O extends CreateFnParam<T>>(o: O) => {
    return Object.entries<ModelSchemaItem>(model)
      .reduce((obj, [key, { type, auto }]) => {
        const newValue = (o as any)[key]
        const inst = type.generateInst(!auto ? newValue : undefined)
        return Object.assign(obj, {
          get [key] () {
            return inst.get()
          },
          set [key] (value: any) {
            inst.set(value)
          },
        })
      }, {}) as CreateFnResult<T>}
}

export const Event = defineModel({
  id: {
    type: DataTypes.ID(),
    auto: true,
  },
  date: DataTypes.Date(),
  order: DataTypes.Number(),
  referId: DataTypes.ID(),
})

type E = typeof Event

type FFF = CreateFnParam<E>
