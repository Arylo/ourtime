import { match, P } from "ts-pattern";
import { createItem, Item } from "../types/Item";
import { Story } from "../types/Story";

export class ItemInstance {
  private itemId: Item['id'];

  public get id() {
    return this.itemId;
  }

  public toObject() {
    return this.story.map.items.find(i => i.id === this.itemId)!;
  }

  constructor(private story: Story, itemOrId: Item['id'] | Parameters<typeof createItem>[0] | Item) {
    this.itemId = match(itemOrId)
      .with(P.string, (id) => {
        const existingItem = this.story.map.items.find(i => i.id === id);
        if (!existingItem) {
          throw new Error(`Item with id ${id} not found in story map`);
        }
        return existingItem.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingItem = this.story.map.items.find(i => i.id === id);
        if (!existingItem) {
          throw new Error(`Item with id ${id} not found in story map`);
        }
        return existingItem.id;
      })
      .with({ name: P.string }, (data) => {
        const newItem = createItem(data);
        this.story.map.items.push(newItem);
        return newItem.id;
      })
      .otherwise(() => {
        throw new Error('Invalid itemOrId parameter');
      });
  }
}
