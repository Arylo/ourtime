import { DataTypes, defineModel } from "@ourtime/element";

export const Value = defineModel({
  id: {
    type: DataTypes.ID(),
    auto: true,
  },
  parentId: {
    type: DataTypes.ID(),
  },
  value: DataTypes.String()
})
