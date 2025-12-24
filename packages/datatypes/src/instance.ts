import { createStory, fromStory, type Story } from './Story';
import { createWorld, World } from './World';
import { createTimeline, Timeline } from './Timeline';
import { createCalendar } from './Calendar';
import { createStoryDate, StoryDate } from './StoryDate';
import { createHistory, History } from './History';
import { createWorldTimeline } from './WorldTimeline';
import { createHistoryTimeline, HistoryTimelineRole } from './HistoryTimeline';
import { createHistoryWorld, HistoryWorldRole } from './HistoryWorld';
import { createHistoryRelation, HistoryRelation } from './HistoryRelation';
import { createHistoryPlace, HistoryPlaceRole } from './HistoryPlace';
import { createHistoryOrganize, HistoryOrganizeRole } from './HistoryOrganize';
import { createHistoryWho, HistoryWhoRole } from './HistoryWho';
import { createPlace, Place } from './Place';
import { createWorldPlace } from './WorldPlace';
import { createWho, Who } from './Who';
import { createWorldWho } from './WorldWho';
import { createItem, Item } from './Item';
import { createOrganize, Organize } from './Organize';

type SimpleHistoryOptions = Parameters<typeof createHistory>[0] & {
  date: StoryDate;
  world?: World | World[];
  timeline?: Timeline;
  place?: Place | Place[];
  who?: Who | Who[] | Array<{ who: Who; role?: HistoryWhoRole }>;
  organize?: Organize | Organize[] | Array<{ organize: Organize; role?: HistoryOrganizeRole }>;
  relations?: Array<Omit<HistoryRelation, 'fromHistoryId' | 'toHistoryId'> & { historyId: History['id'] }>;
};

class ThisStory {
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

  public appendWorld(...args: Parameters<typeof createWorld>) {
    const world = createWorld(...args);
    const timeline = createTimeline({ name: '主时间线' });
    const worldTimeline = createWorldTimeline({
      worldId: world.id,
      timelineId: timeline.id,
    });

    this.story.map.world.push(world);
    this.story.map.timeline.push(timeline);
    this.story.map.worldTimeline.push(worldTimeline);

    return world
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
    this.story.map.historyWorld = this.story.map.historyWorld.filter(hw => hw.worldId !== worldId);
  }

  public appendTimeline(...args: Parameters<typeof createTimeline>) {
    const timeline = createTimeline(...args);
    this.story.map.timeline.push(timeline);
    return timeline;
  }

  public updateTimeline(
    timelineId: Timeline['id'],
    updates: Partial<Omit<Timeline, 'id'>>,
  ) {
    const timeline = this.story.map.timeline.find(t => t.id === timelineId);
    if (!timeline) {
      throw new Error(`Timeline not found: ${timelineId}`);
    }

    if (updates.name !== undefined) timeline.name = updates.name;
    if (updates.baseOn !== undefined) timeline.baseOn = updates.baseOn;
    if (updates.baseAt !== undefined) timeline.baseAt = updates.baseAt;
    if (updates.speed !== undefined) timeline.speed = updates.speed;

    return timeline;
  }

  public removeTimeline(timelineId: Timeline['id']) {
    const index = this.story.map.timeline.findIndex(t => t.id === timelineId);
    if (index === -1) {
      throw new Error(`Timeline not found: ${timelineId}`);
    }
    this.story.map.timeline.splice(index, 1);
    this.cleanupTimelineRelations(timelineId);
  }

  private cleanupTimelineRelations(timelineId: Timeline['id']) {
    this.story.map.worldTimeline = this.story.map.worldTimeline.filter(wt => wt.timelineId !== timelineId);
    this.story.map.historyTimeline = this.story.map.historyTimeline.filter(ht => ht.timelineId !== timelineId);
  }

  public appendItem(...args: Parameters<typeof createItem>) {
    const item = createItem(...args);
    this.story.map.items.push(item);
    return item;
  }

  public updateItem(
    itemId: Item['id'],
    updates: Partial<Omit<Item, 'id'>>,
  ) {
    const item = this.story.map.items.find(i => i.id === itemId);
    if (!item) {
      throw new Error(`Item not found: ${itemId}`);
    }

    if (updates.name !== undefined) item.name = updates.name;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.createdAt !== undefined) item.createdAt = updates.createdAt;
    if (updates.endAt !== undefined) item.endAt = updates.endAt;
    if (updates.appeared !== undefined) item.appeared = updates.appeared;

    return item;
  }

  public removeItem(itemId: Item['id']) {
    const index = this.story.map.items.findIndex(i => i.id === itemId);
    if (index === -1) {
      throw new Error(`Item not found: ${itemId}`);
    }
    this.story.map.items.splice(index, 1);
    this.cleanupItemRelations(itemId);
  }

  private cleanupItemRelations(itemId: Item['id']) {
    this.story.map.itemWho = this.story.map.itemWho.filter(iw => iw.itemId !== itemId);
    this.story.map.itemPlace = this.story.map.itemPlace.filter(ip => ip.itemId !== itemId);
    this.story.map.itemOrganize = this.story.map.itemOrganize.filter(io => io.itemId !== itemId);
    this.story.map.itemWorld = this.story.map.itemWorld.filter(iw => iw.itemId !== itemId);
  }

  public appendOrganize(...args: Parameters<typeof createOrganize>) {
    const organize = createOrganize(...args);
    this.story.map.organizes.push(organize);
    return organize;
  }

  public updateOrganize(
    organizeId: Organize['id'],
    updates: Partial<Omit<Organize, 'id'>>,
  ) {
    const organize = this.story.map.organizes.find(o => o.id === organizeId);
    if (!organize) {
      throw new Error(`Organize not found: ${organizeId}`);
    }

    if (updates.name !== undefined) organize.name = updates.name;
    if (updates.description !== undefined) organize.description = updates.description;
    if (updates.startAt !== undefined) organize.startAt = updates.startAt;
    if (updates.endAt !== undefined) organize.endAt = updates.endAt;
    if (updates.appeared !== undefined) organize.appeared = updates.appeared;

    return organize;
  }

  public removeOrganize(organizeId: Organize['id']) {
    const index = this.story.map.organizes.findIndex(o => o.id === organizeId);
    if (index === -1) {
      throw new Error(`Organize not found: ${organizeId}`);
    }
    this.story.map.organizes.splice(index, 1);
    this.cleanupOrganizeRelations(organizeId);
  }

  private cleanupOrganizeRelations(organizeId: Organize['id']) {
    this.story.map.organizeWho = this.story.map.organizeWho.filter(ow => ow.organizeId !== organizeId);
    this.story.map.organizePlace = this.story.map.organizePlace.filter(op => op.organizeId !== organizeId);
    this.story.map.historyOrganize = this.story.map.historyOrganize.filter(ho => ho.organizeId !== organizeId);
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

  public appendPlace(options: Parameters<typeof createPlace>[0] & { world?: World }) {
    const place = createPlace(options);
    this.story.map.places.push(place);

    const targetWorldId = this.resolveWorldId(options.world);
    const worldPlace = createWorldPlace({ worldId: targetWorldId, placeId: place.id });
    this.story.map.worldPlace.push(worldPlace);

    return place;
  }

  public updatePlace(
    placeId: Place['id'],
    updates: Partial<Omit<Place, 'id'>> & { world?: World },
  ) {
    const place = this.story.map.places.find(p => p.id === placeId);
    if (!place) {
      throw new Error(`Place not found: ${placeId}`);
    }

    if (updates.name !== undefined) place.name = updates.name;
    if (updates.locatedId !== undefined) place.locatedId = updates.locatedId;
    if (updates.startAt !== undefined) place.startAt = updates.startAt;
    if (updates.endAt !== undefined) place.endAt = updates.endAt;
    if (updates.appeared !== undefined) place.appeared = updates.appeared;

    if (updates.world !== undefined) {
      const targetWorldId = this.resolveWorldId(updates.world);
      this.story.map.worldPlace = this.story.map.worldPlace.filter(wp => wp.placeId !== placeId);
      const worldPlace = createWorldPlace({ worldId: targetWorldId, placeId: place.id });
      this.story.map.worldPlace.push(worldPlace);
    }

    return place;
  }

  public removePlace(placeId: Place['id']) {
    const index = this.story.map.places.findIndex(p => p.id === placeId);
    if (index === -1) {
      throw new Error(`Place not found: ${placeId}`);
    }
    this.story.map.places.splice(index, 1);
    this.cleanupPlaceRelations(placeId);
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

  private cleanupPlaceRelations(placeId: Place['id']) {
    this.story.map.worldPlace = this.story.map.worldPlace.filter(wp => wp.placeId !== placeId);
    this.story.map.historyPlace = this.story.map.historyPlace.filter(hp => hp.placeId !== placeId);
    this.story.map.itemPlace = this.story.map.itemPlace.filter(ip => ip.placeId !== placeId);
    this.story.map.organizePlace = this.story.map.organizePlace.filter(op => op.placeId !== placeId);
  }

  public appendWho(options: Parameters<typeof createWho>[0] & { world?: World }) {
    const who = createWho(options);
    this.story.map.who.push(who);

    const targetWorldId = this.resolveWorldId(options.world);
    const worldWho = createWorldWho({ worldId: targetWorldId, whoId: who.id });
    this.story.map.worldWho.push(worldWho);

    return who;
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
      const worldWho = createWorldWho({ worldId: targetWorldId, whoId: who.id });
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
    const targetId = place?.id ?? this.story.map.places[0]?.id;
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
    const targetId = organize?.id ?? this.story.map.organizes[0]?.id;
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
    const targetId = who?.id ?? this.story.map.who[0]?.id;
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
    const timelineId = this.resolveTimelineId(options.timeline);
    const timelineObj = this.story.map.timeline.find(t => t.id === timelineId);
    return this.appendSimpleHistory({
      ...options,
      timeline: timelineObj,
    });
  }

  public appendSimplePlaceHistory(options: Omit<SimpleHistoryOptions, 'world' | 'timeline' | 'who' | 'organize'>) {
    return this.appendSimpleHistory(options);
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

    // 处理 world 关联（支持单个或数组）
    if (options.world) {
      const worldList = Array.isArray(options.world) ? options.world : [options.world];
      worldList.forEach(world => {
        const worldId = this.resolveWorldId(world);
        const historyWorld = createHistoryWorld({
          historyId: history.id,
          worldId,
          role: HistoryWorldRole.OCCURRED_IN,
        });
        this.story.map.historyWorld.push(historyWorld);
      });
    }

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
      let whoList: Array<{ who: Who; role?: HistoryWhoRole }>;

      if (Array.isArray(options.who)) {
        // 检查是数组中第一个元素是否有 who 属性（即已经是对象数组）
        if (options.who.length > 0 && 'who' in options.who[0]) {
          whoList = options.who as Array<{ who: Who; role?: HistoryWhoRole }>;
        } else {
          // 纯 Who[] 数组，需要转换
          whoList = (options.who as Who[]).map(w => ({ who: w }));
        }
      } else {
        // 单个 Who 对象
        whoList = [{ who: options.who as Who }];
      }

      whoList.forEach(item => {
        const whoId = this.resolveWhoId(item.who);
        const historyWho = createHistoryWho({
          historyId: history.id,
          whoId,
          role: item.role ?? HistoryWhoRole.PARTICIPANT,
        });
        this.story.map.historyWho.push(historyWho);
      });
    }

    // 处理 organize 关联（支持单个、数组或带角色的对象数组）
    if (options.organize) {
      let organizeList: Array<{ organize: Organize; role?: HistoryOrganizeRole }>;

      if (Array.isArray(options.organize)) {
        // 检查是数组中第一个元素是否有 organize 属性（即已经是对象数组）
        if (options.organize.length > 0 && 'organize' in options.organize[0]) {
          organizeList = options.organize as Array<{ organize: Organize; role?: HistoryOrganizeRole }>;
        } else {
          // 纯 Organize[] 数组，需要转换
          organizeList = (options.organize as Organize[]).map(o => ({ organize: o }));
        }
      } else {
        // 单个 Organize 对象
        organizeList = [{ organize: options.organize as Organize }];
      }

      organizeList.forEach(item => {
        const organizeId = this.resolveOrganizeId(item.organize);
        const historyOrganize = createHistoryOrganize({
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

export function newStory(...args: Parameters<typeof createStory>) {
  const instance = new ThisStory(createStory(...args))
  instance.appendWorld({ name: '主世界' })

  const storyCalendar = instance.appendCalendar({
    name: '故事历',
    description: '故事世界的标准历法',
  });
  const startDate = createStoryDate({
    rangeStart: 0,
    rangeEnd: 0,
    timelineId: instance.map.timeline[0].id,
    calendarId: storyCalendar.id,
  });
  instance.appendSimpleTimelineHistory({
    name: '故事开始',
    date: startDate,
  })

  return instance;
}

export function loadStory(data: Record<string, any>) {
  const instance = new ThisStory(fromStory(data));
  return instance;
}
