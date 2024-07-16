import type { Values } from "./types"
import type { Model } from "./defineModel"
import { BooleanDataType, DateDataType, NumberDataType, ObjectDataType, StringDataType } from "./DataTypes"

type TransformType<T> = T extends StringDataType<infer R> ? (R extends Record<string, string> ? Values<R> : string) :
  T extends NumberDataType ? number :
  T extends BooleanDataType ? boolean :
  T extends DateDataType ? Date :
  T extends ObjectDataType ? object :
  never

type AutoKeys<T extends Model<any>> = {
  [K in keyof T]: T[K] extends { auto: true } ? K : never;
}[keyof T]

type RequiredKeys<T extends Model<any>> = {
  [K in keyof T]: K extends AutoKeys<T> ? never : (T[K] extends { optional: true } ? never : K);
}[keyof T]

type OptionalKeys<T extends Model<any>> = {
  [K in keyof T]: K extends AutoKeys<T> ? never : (T[K] extends { optional: true } ? K : never);
}[keyof T]

type CreateFnParam<T extends Model<any>> = {
  [K in RequiredKeys<T>]: TransformType<T[K]['type']>;
} & {
  [K in OptionalKeys<T>]?: TransformType<T[K]['type']>;
}

type CreateFnResult<T extends Model<any>> = {
  [K in AutoKeys<T>]: TransformType<T[K]['type']>;
} & CreateFnParam<T>

export const genCreateFn = <T extends Model<any>>(model: T) => {
  return <O extends CreateFnParam<T>>(o: O) => Object.keys(model).reduce((obj, key) => Object.assign(obj, { [key]: (o as any)[key] }), {}) as CreateFnResult<T>
}
