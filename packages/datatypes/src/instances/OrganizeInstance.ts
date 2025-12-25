import { match, P } from "ts-pattern";
import { createOrganize, Organize } from "../types/Organize";
import { Story } from "../types/Story";

export class OrganizeInstance {
  private organizeId: Organize['id'];

  public get id() {
    return this.organizeId;
  }

  public toObject() {
    return this.story.map.organizes.find(o => o.id === this.organizeId)!;
  }

  constructor(private story: Story, organizeOrId: Organize['id'] | Parameters<typeof createOrganize>[0] | Organize) {
    this.organizeId = match(organizeOrId)
      .with(P.string, (id) => {
        const existingOrganize = this.story.map.organizes.find(o => o.id === id);
        if (!existingOrganize) {
          throw new Error(`Organize with id ${id} not found in story map`);
        }
        return existingOrganize.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingOrganize = this.story.map.organizes.find(o => o.id === id);
        if (!existingOrganize) {
          throw new Error(`Organize with id ${id} not found in story map`);
        }
        return existingOrganize.id;
      })
      .with({ name: P.string }, (data) => {
        const newOrganize = createOrganize(data);
        this.story.map.organizes.push(newOrganize);
        return newOrganize.id;
      })
      .otherwise(() => {
        throw new Error('Invalid organizeOrId parameter');
      });
  }
}
