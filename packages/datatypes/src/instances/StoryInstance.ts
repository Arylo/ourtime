import { type Story } from '../types/Story';
import { match, P } from 'ts-pattern';
import { createWorld, World } from '../types/World';
import type { Timeline } from '../types/Timeline';
import { createCalendar } from '../types/Calendar';
import type { StoryDate } from '../types/StoryDate';
import { createHistory, History } from '../types/History';
import { createHistoryTimeline, HistoryTimelineRole } from '../types/HistoryTimeline';
import { createHistoryRelation, HistoryRelation } from '../types/HistoryRelation';
import { createHistoryPlace, HistoryPlaceRole } from '../types/HistoryPlace';
import { createHistoryOrganize, HistoryOrganizeRole } from '../types/HistoryOrganize';
import { createHistoryWho, HistoryWhoRole } from '../types/HistoryWho';
import type { Place } from '../types/Place';
import { createWho, Who } from '../types/Who';
import { createWorldWho, WorldWhoRole } from '../types/WorldWho';
import { createItem } from '../types/Item';
import { createOrganize, Organize } from '../types/Organize';
import { loadWorld, newWorld } from './world';
import { newOrganize } from './organize';
import { newItem } from './item';
import { newWho } from './who';

type SimpleHistoryOptions = Parameters<typeof createHistory>[0] & {
  date: StoryDate;
  world?: World | World[];
  timeline?: Timeline;
  place?: Place | Place[];
  who?: Who | Who[] | Array<{ who: Who; } & Partial<Omit<Parameters<typeof createHistoryWho>[0], 'historyId' | 'whoId'>>>;
  organize?: Organize | Organize[] | Array<{ organize: Organize; } & Partial<Omit<Parameters<typeof createHistoryOrganize>[0], 'historyId' | 'organizeId'>>>;
  relations?: Array<Omit<HistoryRelation, 'fromHistoryId' | 'toHistoryId'> & { historyId: History['id'] }>;
};

export class StoryInstance {
  constructor(private story: Story) {}

  public get id () {
    return this.story.id;
  }

  public get name () {
    return this.story.name;
  }

  public get description () {
    return this.story.description;
  }

  public get summary () {
    return this.story.summary;
  }

  public get map () {
    return this.story.map;
  }

  public toObject() {
    return this.story
  }
  public toJSON() {
    return JSON.stringify(this.toObject())
  }

  public listWorlds () {
    return this.story.map.world.map(w => loadWorld(this.story, w));
  }

  public appendWorld(...args: Parameters<typeof createWorld>) {
    const world = newWorld(this.story, ...args);
    return world;
  }

  public updateWorld(
    worldId: World['id'],
    updates: Partial<Omit<World, 'id'>>,
  ) {
    const world = this.story.map.world.find(w => w.id === worldId);
    if (!world) {
      throw new Error(`World not found: ${worldId}`);
    }

    if (updates.name !== undefined) world.name = updates.name;
    if (updates.startAt !== undefined) world.startAt = updates.startAt;
    if (updates.endAt !== undefined) world.endAt = updates.endAt;
    if (updates.parents !== undefined) world.parents = updates.parents;

    return world;
  }

  public removeWorld(worldId: World['id']) {
    const index = this.story.map.world.findIndex(w => w.id === worldId);
    if (index === -1) {
      throw new Error(`World not found: ${worldId}`);
    }
    this.story.map.world.splice(index, 1);
    this.cleanupWorldRelations(worldId);
  }

  private cleanupWorldRelations(worldId: World['id']) {
    this.story.map.worldWho = this.story.map.worldWho.filter(ww => ww.worldId !== worldId);
    this.story.map.worldTimeline = this.story.map.worldTimeline.filter(wt => wt.worldId !== worldId);
    this.story.map.worldPlace = this.story.map.worldPlace.filter(wp => wp.worldId !== worldId);
  }

  public appendItem(item: Parameters<typeof createItem>[0]) {
    return newItem(this.story, item);
  }

  public appendOrganize(organize: Parameters<typeof createOrganize>[0]) {
    return newOrganize(this.story, organize);
  }

  public appendCalendar(...args: Parameters<typeof createCalendar>) {
    const calendar = createCalendar(...args);
    this.story.map.calendars.push(calendar);

    return calendar
  }

  public updateCalendar(
    calendarId: string,
    updates: Partial<Omit<typeof createCalendar extends (...args: any[]) => infer R ? R : never, 'id'>>,
  ) {
    const calendar = this.story.map.calendars.find(c => c.id === calendarId);
    if (!calendar) {
      throw new Error(`Calendar not found: ${calendarId}`);
    }

    if (updates.name !== undefined) calendar.name = updates.name;
    if (updates.description !== undefined) calendar.description = updates.description;
    if (updates.months !== undefined) calendar.months = updates.months;

    return calendar;
  }

  public removeCalendar(calendarId: string) {
    const index = this.story.map.calendars.findIndex(c => c.id === calendarId);
    if (index === -1) {
      throw new Error(`Calendar not found: ${calendarId}`);
    }
    this.story.map.calendars.splice(index, 1);
    this.cleanupCalendarRelations(calendarId);
  }

  private cleanupCalendarRelations(calendarId: string) {
    // Calendar 没有直接的关系需要清理，storyDates 在各个 history 中独立存储
  }

  private resolveWorldId(world?: World) {
    const targetId = world?.id ?? this.story.map.world[0]?.id;
    if (!targetId) {
      throw new Error('No world available to attach place');
    }
    const exists = this.story.map.world.some(w => w.id === targetId);
    if (!exists) {
      throw new Error(`World not found: ${targetId}`);
    }
    return targetId;
  }

  public appendWho(who: Parameters<typeof createWho>[0]) {
    return newWho(this.story, who);
  }

  public updateWho(
    whoId: Who['id'],
    updates: Partial<Omit<Who, 'id'>> & { world?: World },
  ) {
    const who = this.story.map.who.find(w => w.id === whoId);
    if (!who) {
      throw new Error(`Who not found: ${whoId}`);
    }

    if (updates.name !== undefined) who.name = updates.name;
    if (updates.description !== undefined) who.description = updates.description;
    if (updates.alias !== undefined) who.alias = updates.alias;
    if (updates.bornAt !== undefined) who.bornAt = updates.bornAt;
    if (updates.diedAt !== undefined) who.diedAt = updates.diedAt;
    if (updates.parents !== undefined) who.parents = updates.parents;
    if (updates.appeared !== undefined) who.appeared = updates.appeared;

    if (updates.world !== undefined) {
      const targetWorldId = this.resolveWorldId(updates.world);
      this.story.map.worldWho = this.story.map.worldWho.filter(ww => ww.whoId !== whoId);
      const worldWho = createWorldWho({
        worldId: targetWorldId,
        whoId: who.id,
        role: WorldWhoRole.OWNER, // Added required role
      });
      this.story.map.worldWho.push(worldWho);
    }

    return who;
  }

  public removeWho(whoId: Who['id']) {
    const index = this.story.map.who.findIndex(w => w.id === whoId);
    if (index === -1) {
      throw new Error(`Who not found: ${whoId}`);
    }
    this.story.map.who.splice(index, 1);
    this.cleanupWhoRelations(whoId);
  }

  private cleanupWhoRelations(whoId: Who['id']) {
    this.story.map.worldWho = this.story.map.worldWho.filter(ww => ww.whoId !== whoId);
    this.story.map.historyWho = this.story.map.historyWho.filter(hw => hw.whoId !== whoId);
    this.story.map.itemWho = this.story.map.itemWho.filter(iw => iw.whoId !== whoId);
    this.story.map.organizeWho = this.story.map.organizeWho.filter(ow => ow.whoId !== whoId);
  }

  private resolveTimelineId(timeline?: Timeline) {
    const targetId = timeline?.id ?? this.story.map.timeline[0]?.id;
    if (!targetId) {
      throw new Error('No timeline available to attach history');
    }
    const exists = this.story.map.timeline.some(t => t.id === targetId);
    if (!exists) {
      throw new Error(`Timeline not found: ${targetId}`);
    }
    return targetId;
  }

  private resolvePlaceId(place?: Place) {
    if (!place && this.story.map.places.length === 0) {
      throw new Error('No place available to attach history');
    }
    const targetId = place?.id
    if (!targetId) {
      throw new Error('No place available to attach history');
    }
    const exists = this.story.map.places.some(p => p.id === targetId);
    if (!exists) {
      throw new Error(`Place not found: ${targetId}`);
    }
    return targetId;
  }

  private resolveOrganizeId(organize?: Organize) {
    if (!organize && this.story.map.organizes.length === 0) {
      throw new Error('No organize available to attach history');
    }
    const targetId = organize?.id
    if (!targetId) {
      throw new Error('No organize available to attach history');
    }
    const exists = this.story.map.organizes.some(o => o.id === targetId);
    if (!exists) {
      throw new Error(`Organize not found: ${targetId}`);
    }
    return targetId;
  }

  private resolveWhoId(who?: Who) {
    if (!who && this.story.map.who.length === 0) {
      throw new Error('No who available to attach history');
    }
    const targetId = who?.id
    if (!targetId) {
      throw new Error('No who available to attach history');
    }
    const exists = this.story.map.who.some(w => w.id === targetId);
    if (!exists) {
      throw new Error(`Who not found: ${targetId}`);
    }
    return targetId;
  }

  public appendSimpleWorldHistory(options: Omit<SimpleHistoryOptions, 'timeline' | 'place' | 'who' | 'organize'>) {
    return this.appendSimpleHistory(options);
  }

  public appendSimpleTimelineHistory(options: Omit<SimpleHistoryOptions, 'world' | 'place' | 'who' | 'organize'>) {
    return this.appendSimpleHistory({ timeline: true as any, ...options });
  }

  public appendSimpleWhoHistory(options: Omit<SimpleHistoryOptions, 'world' | 'timeline' | 'place' | 'organize'>) {
    return this.appendSimpleHistory(options);
  }

  public appendSimpleOrganizeHistory(options: Omit<SimpleHistoryOptions, 'world' | 'timeline' | 'place' | 'who'>) {
    return this.appendSimpleHistory(options);
  }

  public appendSimpleHistory(options: SimpleHistoryOptions) {
    const history = createHistory({
      ...options,
      startAt: options.date,
      endAt: options.date,
    });
    this.story.map.Histories.push(history);

    // 处理 timeline 关联
    if (options.timeline) {
      const timelineId = this.resolveTimelineId(options.timeline);
      const historyTimeline = createHistoryTimeline({
        historyId: history.id,
        timelineId,
        role: HistoryTimelineRole.OCCURRED_IN,
      });
      this.story.map.historyTimeline.push(historyTimeline);
    }

    // 处理 place 关联（支持单个或数组）
    if (options.place) {
      const placeList = Array.isArray(options.place) ? options.place : [options.place];
      placeList.forEach(place => {
        const placeId = this.resolvePlaceId(place);
        const historyPlace = createHistoryPlace({
          historyId: history.id,
          placeId,
          role: HistoryPlaceRole.OCCURRED_IN,
        });
        this.story.map.historyPlace.push(historyPlace);
      });
    }

    // 处理 who 关联（支持单个、数组或带角色的对象数组）
    if (options.who) {

      const whoList = match(options.who)
        .returnType<Array<{ who: Who; role?: HistoryWhoRole }>>()
        .with({ id: P.string }, (o) => [{ who: o }])
        .with(P.array({ id: P.string }), (o) => o.map(w => ({ who: w })))
        .with(P.array({ who: { id: P.string } }), (o) => o)
        .run()

      whoList.forEach(item => {
        const whoId = this.resolveWhoId(item.who);
        const historyWho = createHistoryWho({
          ...item,
          historyId: history.id,
          whoId,
          role: item.role ?? HistoryWhoRole.PARTICIPANT,
        });
        this.story.map.historyWho.push(historyWho);
      });
    }

    // 处理 organize 关联（支持单个、数组或带角色的对象数组）
    if (options.organize) {
      const organizeList = match(options.organize)
        .returnType<Array<{ organize: Organize; role?: HistoryOrganizeRole }>>()
        .with({ id: P.string }, (o) => [{ organize: o }])
        .with(P.array({ id: P.string }), (arr) => arr.map(o => ({ organize: o })))
        .with(P.array({ organize: { id: P.string } }), (arr) => arr)
        .run()

      organizeList.forEach(item => {
        const organizeId = this.resolveOrganizeId(item.organize);
        const historyOrganize = createHistoryOrganize({
          ...item,
          historyId: history.id,
          organizeId,
          role: item.role ?? HistoryOrganizeRole.PARTICIPANT,
        });
        this.story.map.historyOrganize.push(historyOrganize);
      });
    }

    this.appendHistoryRelations(history, options.relations);

    return history;
  }

  private appendHistoryRelations(
    history: History,
    relations: Array<Omit<HistoryRelation, 'fromHistoryId' | 'toHistoryId'> & { historyId: History['id'] }> = [],
  ) {
    if (relations?.length) {
      relations.forEach(relation => {
        const historyRelation = createHistoryRelation({
          fromHistoryId: history.id,
          toHistoryId: relation.historyId,
          type: relation.type,
          value: relation.value,
        });
        this.story.map.historyRelation.push(historyRelation);
      })
    }
  }
}
