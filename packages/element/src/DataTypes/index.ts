import { BooleanDataType } from './Boolean'
import { DateDataType } from './Date'
import { IDDataType } from './ID'
import { NumberDataType } from './Number'
import { ObjectDataType } from './Object'
import { StringDataType } from './String'

export type * from './String'
export type * from './Boolean'
export type * from './Number'
export type * from './Object'
export type * from './Date'

export type * from './ID'

export const DataTypes = {
  String: StringDataType.createDataType,
  Number: NumberDataType.createDataType,
  Boolean: BooleanDataType.createDataType,
  Date: DateDataType.createDataType,
  Object: ObjectDataType.createDataType,
  ID: IDDataType.createDataType,
} as const
