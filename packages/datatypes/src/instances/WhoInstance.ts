import { match, P } from "ts-pattern";
import { createWho, Who } from "../types/Who";
import { Story } from "../types/Story";

export class WhoInstance {
  private whoId: Who['id'];

  public get id() {
    return this.whoId;
  }

  public toObject() {
    return this.story.map.who.find(w => w.id === this.whoId)!;
  }

  constructor(private story: Story, whoOrId: Who['id'] | Parameters<typeof createWho>[0] | Who) {
    this.whoId = match(whoOrId)
      .with(P.string, (id) => {
        const existingWho = this.story.map.who.find(w => w.id === id);
        if (!existingWho) {
          throw new Error(`Who with id ${id} not found in story map`);
        }
        return existingWho.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingWho = this.story.map.who.find(w => w.id === id);
        if (!existingWho) {
          throw new Error(`Who with id ${id} not found in story map`);
        }
        return existingWho.id;
      })
      .with({ name: P.string }, (data) => {
        const newWho = createWho(data);
        this.story.map.who.push(newWho);
        return newWho.id;
      })
      .otherwise(() => {
        throw new Error('Invalid whoOrId parameter');
      });
  }
}
