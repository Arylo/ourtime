import { match, P } from "ts-pattern";
import { createHistory, History } from "../types/History";
import { Story } from "../types/Story";
import { Timeline } from "../types/Timeline";
import { createHistoryTimeline, HistoryTimelineRole } from "../types/HistoryTimeline";
import type { TimelineInstance } from "./TimelineInstance";
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

  constructor(private story: Story, private timeline: Timeline, historyOrId: History['id'] | Parameters<typeof createHistory>[0] | History) {
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

    const exist = this.story.map.historyTimeline.find(ht => ht.historyId === this.id && ht.timelineId === this.timeline.id);
    if (!exist) {
      this.associateTimeline(this.timeline.id);
    }
  }

  // 关联时间线
  public associateTimeline(timelineOrId: Timeline | Timeline['id'] | TimelineInstance) {
    const timelineId = match(timelineOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingTimeline = this.story.map.timeline.find(t => t.id === timelineId);
    if (!existingTimeline) {
      throw new Error(`Timeline with id ${timelineId} not found in story map`);
    }

    // 添加新的关联
    this.story.map.historyTimeline.push(createHistoryTimeline({
      historyId: this.id,
      timelineId: timelineId,
      key: 'role',
      value: HistoryTimelineRole.OCCURRED_IN,
    }));

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
