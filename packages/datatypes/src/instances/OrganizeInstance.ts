import { match, P } from "ts-pattern";
import { createOrganize, Organize } from "../types/Organize";
import { Story } from "../types/Story";
import { Who } from "../types/Who";
import { loadWho } from "./who";
import { createOrganizeWho, OrganizeWhoRole } from "../types/OrganizeWho";
import type { WhoInstance } from "./WhoInstance";
import { StoryDate } from "../types/StoryDate";

export class OrganizeInstance {
  private organizeId: Organize['id'];

  public get id() {
    return this.organizeId;
  }

  public toObject() {
    return this.story.map.organizes.find(o => o.id === this.organizeId)!;
  }

  public get name () {
    return this.toObject().name;
  }

  public set name (newName: string) {
    this.toObject().name = newName;
  }

  public get description () {
    return this.toObject().description ?? '';
  }

  public set description (newDescription: string) {
    this.toObject().description = newDescription;
  }

  public get affiliatedId () {
    return this.toObject().affiliatedId;
  }

  public set affiliatedId (newAffiliatedId: string | undefined) {
    this.toObject().affiliatedId = newAffiliatedId;
  }

  public get startAt () {
    return this.toObject().startAt;
  }

  public set startAt (newStartAt: StoryDate | undefined) {
    this.toObject().startAt = newStartAt;
  }

  public get endAt () {
    return this.toObject().endAt;
  }

  public set endAt (newEndAt: StoryDate | undefined) {
    this.toObject().endAt = newEndAt;
  }

  public get appeared () {
    return this.toObject().appeared ?? false;
  }

  public set appeared (value: boolean) {
    this.toObject().appeared = value;
  }

  public get departed () {
    return this.toObject().departed ?? false;
  }

  public set departed (value: boolean) {
    this.toObject().departed = value;
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
    const whoIds = Array.from(new Set(this.story.map.organizeWho
      .filter(ow => ow.organizeId === this.id)
      .map(ow => ow.whoId)));

    return whoIds.map(whoId => {
        const whoData = this.story.map.who.find(w => w.id === whoId);
        if (!whoData) {
          throw new Error(`Who with id ${whoId} not found in story map`);
        }
        return loadWho(this.story, whoData);
      })
  }

  public inviteWho(
    likeWho: string | Who | WhoInstance,
    options: { role?: OrganizeWhoRole, startAt?: StoryDate } = { role: OrganizeWhoRole.MEMBER },
  ) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingWho = this.story.map.who.find(w => w.id === id);
    if (!existingWho) {
      throw new Error(`Who with id ${id} not found in story map`);
    }

    if (options.role) {
      this.story.map.organizeWho.push(createOrganizeWho({
        organizeId: this.id,
        whoId: id,
        key: 'role',
        value: options.role,
      }));
    }

    if (options.startAt) {
      this.story.map.organizeWho.push(createOrganizeWho({
        organizeId: this.id,
        whoId: id,
        key: 'startAt',
        value: options.startAt,
      }));
    }

    return this
  }

  public removeWho(likeWho: string | Who | WhoInstance, options: { endAt: StoryDate }) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingWho = this.story.map.who.find(w => w.id === id);
    if (!existingWho) {
      throw new Error(`Who with id ${id} not found in story map`);
    }

    if (options.endAt) {
      this.story.map.organizeWho.push(createOrganizeWho({
        organizeId: this.id,
        whoId: id,
        key: 'endAt',
        value: options.endAt,
      }));
    }

    return this
  }

  public changeWho(
    likeWho: string | Who | WhoInstance,
    data: { role?: OrganizeWhoRole } = {}
) {
    const id = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const entries = this.story.map.organizeWho.filter(ow => ow.organizeId === this.id && ow.whoId === id);
    if (entries.length === 0) {
      throw new Error(`Who with id ${id} is not a member of organize ${this.id}`);
    }

    if (data.role !== undefined) {
      const roleEntry = entries.find(e => e.key === 'role');
      if (roleEntry) {
        roleEntry.value = data.role;
      } else {
        this.story.map.organizeWho.push(createOrganizeWho({
          organizeId: this.id,
          whoId: id,
          key: 'role',
          value: data.role,
        }));
      }
    }

    return this
  }

  /**
   * 添加附属组织
   */
  public appendSubOrganize(organize: Omit<Parameters<typeof createOrganize>[0], 'affiliatedId'>) {
    return new OrganizeInstance(this.story, {
      ...organize,
      affiliatedId: this.id,
    });
  }

  /**
   * 列出附属组织
   */
  public listSubOrganizes() {
    return this.story.map.organizes
      .filter(o => o.affiliatedId === this.id)
      .map(o => new OrganizeInstance(this.story, o));
  }
}
