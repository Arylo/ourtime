import { match, P } from "ts-pattern";
import { createHistory, History } from "../types/History";
import { Story } from "../types/Story";
import { Timeline } from "../types/Timeline";
import { createHistoryTimeline, HistoryTimelineRole } from "../types/HistoryTimeline";
import { createHistoryWho, HistoryWhoRole } from "../types/HistoryWho";
import { createHistoryPlace, HistoryPlaceRole } from "../types/HistoryPlace";
import { createHistoryOrganize, HistoryOrganizeRole } from "../types/HistoryOrganize";
import type { TimelineInstance } from "./TimelineInstance";
import { StoryDate } from "../types/StoryDate";
import { Organize } from "../types/Organize";
import { OrganizeInstance } from "./OrganizeInstance";
import { Who } from "../types/Who";
import { WhoInstance } from "./WhoInstance";
import { World } from "../types/World";
import { WorldInstance } from "./WorldInstance";
import { Place } from "../types/Place";
import { PlaceInstance } from "./PlaceInstance";
import { Item } from "../types/Item";
import { ItemInstance } from "./ItemInstance";
import {
  createHistoryWorldAffected,
  createHistoryOrganizeAffected,
  createHistoryWhoAffected,
  createHistoryPlaceAffected,
  createHistoryItemAffected,
} from "../types/HistoryAffected";

export class HistoryInstance {
  private historyId: History['id'];

  public get id() {
    return this.historyId;
  }

  public toObject() {
    return this.story.map.Histories.find(h => h.id === this.historyId)!;
  }

  constructor(private story: Story, historyOrId: History['id'] | Parameters<typeof createHistory>[0] | History) {
    this.historyId = match(historyOrId)
      .with(P.string, (id) => {
        const existingHistory = this.story.map.Histories.find(h => h.id === id);
        if (!existingHistory) {
          throw new Error(`History with id ${id} not found in story map`);
        }
        return existingHistory.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingHistory = this.story.map.Histories.find(h => h.id === id);
        if (!existingHistory) {
          throw new Error(`History with id ${id} not found in story map`);
        }
        return existingHistory.id;
      })
      .with({ name: P.string }, (data) => {
        const newHistory = createHistory(data);
        this.story.map.Histories.push(newHistory);
        return newHistory.id;
      })
      .otherwise(() => {
        throw new Error('Invalid historyOrId parameter');
      });
  }

  // 关联时间线
  public associateTimeline(
    timelineOrId: Timeline | Timeline['id'] | TimelineInstance,
    data: { role?: HistoryTimelineRole; startAt?: StoryDate; endAt?: StoryDate } = {
      role: HistoryTimelineRole.OCCURRED_IN,
    }
  ) {
    const timelineId = match(timelineOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingTimeline = this.story.map.timeline.find(t => t.id === timelineId);
    if (!existingTimeline) {
      throw new Error(`Timeline with id ${timelineId} not found in story map`);
    }

    if (data.role) {
      this.story.map.historyTimeline.push(createHistoryTimeline({
        historyId: this.id,
        timelineId: timelineId,
        key: 'role',
        value: data.role,
      }));
    }

    if (data.startAt) {
      this.story.map.historyTimeline.push(createHistoryTimeline({
        historyId: this.id,
        timelineId: timelineId,
        key: 'startAt',
        value: data.startAt,
      }));
    }

    if (data.endAt) {
      this.story.map.historyTimeline.push(createHistoryTimeline({
        historyId: this.id,
        timelineId: timelineId,
        key: 'endAt',
        value: data.endAt,
      }));
    }

    return this
  }

  // 关联人物
  public associateWho(
    whoOrId: Who | Who['id'] | WhoInstance,
    data: { role?: HistoryWhoRole; startAt?: StoryDate; endAt?: StoryDate } = {
      role: HistoryWhoRole.PARTICIPANT,
    }
  ) {
    const whoId = match(whoOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingWho = this.story.map.who.find(w => w.id === whoId);
    if (!existingWho) {
      throw new Error(`Who with id ${whoId} not found in story map`);
    }

    if (data.role) {
      this.story.map.historyWho.push(createHistoryWho({
        historyId: this.id,
        whoId: whoId,
        key: 'role',
        value: data.role,
      }));
    }

    if (data.startAt) {
      this.story.map.historyWho.push(createHistoryWho({
        historyId: this.id,
        whoId: whoId,
        key: 'startAt',
        value: data.startAt,
      }));
    }

    if (data.endAt) {
      this.story.map.historyWho.push(createHistoryWho({
        historyId: this.id,
        whoId: whoId,
        key: 'endAt',
        value: data.endAt,
      }));
    }

    return this
  }

  // 关联地点
  public associatePlace(
    placeOrId: Place | Place['id'] | PlaceInstance,
    data: { role?: HistoryPlaceRole; startAt?: StoryDate; endAt?: StoryDate } = {
      role: HistoryPlaceRole.OCCURRED_IN,
    }
  ) {
    const placeId = match(placeOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingPlace = this.story.map.places.find(p => p.id === placeId);
    if (!existingPlace) {
      throw new Error(`Place with id ${placeId} not found in story map`);
    }

    if (data.role) {
      this.story.map.historyPlace.push(createHistoryPlace({
        historyId: this.id,
        placeId: placeId,
        key: 'role',
        value: data.role,
      }));
    }

    if (data.startAt) {
      this.story.map.historyPlace.push(createHistoryPlace({
        historyId: this.id,
        placeId: placeId,
        key: 'startAt',
        value: data.startAt,
      }));
    }

    if (data.endAt) {
      this.story.map.historyPlace.push(createHistoryPlace({
        historyId: this.id,
        placeId: placeId,
        key: 'endAt',
        value: data.endAt,
      }));
    }

    return this
  }

  // 关联组织
  public associateOrganize(
    organizeOrId: Organize | Organize['id'] | OrganizeInstance,
    data: { role?: HistoryOrganizeRole; startAt?: StoryDate; endAt?: StoryDate } = {
      role: HistoryOrganizeRole.PARTICIPANT,
    }
  ) {
    const organizeId = match(organizeOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingOrganize = this.story.map.organizes.find(o => o.id === organizeId);
    if (!existingOrganize) {
      throw new Error(`Organize with id ${organizeId} not found in story map`);
    }

    if (data.role) {
      this.story.map.historyOrganize.push(createHistoryOrganize({
        historyId: this.id,
        organizeId: organizeId,
        key: 'role',
        value: data.role,
      }));
    }

    if (data.startAt) {
      this.story.map.historyOrganize.push(createHistoryOrganize({
        historyId: this.id,
        organizeId: organizeId,
        key: 'startAt',
        value: data.startAt,
      }));
    }

    if (data.endAt) {
      this.story.map.historyOrganize.push(createHistoryOrganize({
        historyId: this.id,
        organizeId: organizeId,
        key: 'endAt',
        value: data.endAt,
      }));
    }

    return this
  }

  affectWorld(likeWorld: string | World | WorldInstance, data: Partial<Omit<World, 'id'>>) {
    const worldId = match(likeWorld)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();
    const existingWorld = this.story.map.world.find(w => w.id === worldId);
    if (!existingWorld) {
      throw new Error(`World with id ${worldId} not found in story map`);
    }
    const affected = createHistoryWorldAffected({
      historyId: this.id,
      worldId: worldId,
      data: data
    });
    this.story.map.historyAffected.push(affected);
    return this;
  }

  affectOrganize(likeOrganize: string | Organize | OrganizeInstance, data: Partial<Omit<Organize, 'id'>>) {
    const organizeId = match(likeOrganize)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();
    const existingOrganize = this.story.map.organizes.find(o => o.id === organizeId);
    if (!existingOrganize) {
      throw new Error(`Organize with id ${organizeId} not found in story map`);
    }
    const affected = createHistoryOrganizeAffected({
      historyId: this.id,
      organizeId: organizeId,
      data: data
    });
    this.story.map.historyAffected.push(affected);
    return this;
  }

  affectWho(likeWho: string | Who | WhoInstance, data: Partial<Omit<Who, 'id'>>) {
    const whoId = match(likeWho)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();
    const existingWho = this.story.map.who.find(w => w.id === whoId);
    if (!existingWho) {
      throw new Error(`Who with id ${whoId} not found in story map`);
    }
    const affected = createHistoryWhoAffected({
      historyId: this.id,
      whoId: whoId,
      data: data
    });
    this.story.map.historyAffected.push(affected);
    return this;
  }

  affectPlace(likePlace: string | Place | PlaceInstance, data: Partial<Omit<Place, 'id'>>) {
    const placeId = match(likePlace)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();
    const existingPlace = this.story.map.places.find(p => p.id === placeId);
    if (!existingPlace) {
      throw new Error(`Place with id ${placeId} not found in story map`);
    }
    const affected = createHistoryPlaceAffected({
      historyId: this.id,
      placeId: placeId,
      data: data
    });
    this.story.map.historyAffected.push(affected);
    return this;
  }

  affectItem(likeItem: string | Item | ItemInstance, data: Partial<Omit<Item, 'id'>>) {
    const itemId = match(likeItem)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();
    const existingItem = this.story.map.items.find(i => i.id === itemId);
    if (!existingItem) {
      throw new Error(`Item with id ${itemId} not found in story map`);
    }
    const affected = createHistoryItemAffected({
      historyId: this.id,
      itemId: itemId,
      data: data
    });
    this.story.map.historyAffected.push(affected);
    return this;
  }
}
