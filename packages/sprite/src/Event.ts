import { DataTypes, defineModel } from "@ourtime/element";

export const Event = defineModel({
  id: {
    type: DataTypes.ID(),
    auto: true,
  },
  date: DataTypes.Date(),
  order: DataTypes.Number(),
  referId: DataTypes.ID(),
})
