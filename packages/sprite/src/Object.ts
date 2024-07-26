import { DataTypes, defineModel } from "@ourtime/element";

export enum ObjectType {
  Good = 'Good',
  Person = 'Person',
  World = 'World',
}

export const Object = defineModel({
  id: {
    type: DataTypes.ID(),
    auto: true,
  },
  parentId: {
    type: DataTypes.ID(),
    optional: true,
  },
  type: DataTypes.String(ObjectType)
})
