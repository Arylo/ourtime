import { match, P } from "ts-pattern";
import { createOrganize, Organize } from "../types/Organize";
import { Story } from "../types/Story";
import { Who } from "../types/Who";
import { loadWho } from "./who";
import { createOrganizeWho, OrganizeWho, OrganizeWhoRole } from "../types/OrganizeWho";
import type { WhoInstance } from "./WhoInstance";

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

  public listWhos () {
    return this.story.map.organizeWho
      .filter(ow => ow.organizeId === this.id)
      .map(ow => {
        const whoData = this.story.map.who.find(w => w.id === ow.whoId);
        if (!whoData) {
          throw new Error(`Who with id ${ow.whoId} not found in story map`);
        }
        return loadWho(this.story, whoData);
      })
  }

  public inviteWho(
    likeWho: string | Who | WhoInstance,
    options: Partial<Pick<OrganizeWho, 'role' | 'startAt'>> = { role: OrganizeWhoRole.MEMBER },
  ) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingWho = this.story.map.who.find(w => w.id === id);
    if (!existingWho) {
      throw new Error(`Who with id ${id} not found in story map`);
    }

    const exist = this.story.map.organizeWho.find(ow => ow.organizeId === this.id && ow.whoId === id);
    if (exist) {
      throw new Error(`Who with id ${id} is already a member of organize ${this.id}`);
    }

    this.story.map.organizeWho.push(createOrganizeWho({
      organizeId: this.id,
      whoId: id,
      role: options.role ?? OrganizeWhoRole.MEMBER,
      startAt: options.startAt,
    }));

    return this
  }

  public removeWho(likeWho: string | Who | WhoInstance) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const index = this.story.map.organizeWho.findIndex(ow => ow.organizeId === this.id && ow.whoId === id);
    if (index === -1) {
      throw new Error(`Who with id ${id} is not a member of organize ${this.id}`);
    }

    this.story.map.organizeWho.splice(index, 1);

    return this
  }

  public changeWho(
    likeWho: string | Who | WhoInstance,
    data: Partial<Pick<OrganizeWho, 'role' | 'startAt' | 'endAt'>> = {}
) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const organizeWho = this.story.map.organizeWho.find(ow => ow.organizeId === this.id && ow.whoId === id);
    if (!organizeWho) {
      throw new Error(`Who with id ${id} is not a member of organize ${this.id}`);
    }

    if (data.role !== undefined) {
      organizeWho.role = data.role;
    }
    if (data.startAt !== undefined) {
      organizeWho.startAt = data.startAt;
    }
    if (data.endAt !== undefined) {
      organizeWho.endAt = data.endAt;
    }

    return this
  }
}
