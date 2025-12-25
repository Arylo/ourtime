import { createItem, Item } from "../types/Item";
import { Story } from "../types/Story";
import { ItemInstance } from "./ItemInstance";

export function newItem(story: Story, item: Parameters<typeof createItem>[0]) {
  return new ItemInstance(story, item);
}

export function loadItem(story: Story, itemOrId: Item['id'] | Item) {
  return new ItemInstance(story, itemOrId);
}
