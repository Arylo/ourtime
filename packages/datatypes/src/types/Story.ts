import { ulid } from 'ulid';
import type { Timeline } from './Timeline';
import type { World } from './World';
import type { Item } from './Item';
import type { Who } from './Who';
import type { History } from './History';
import type { Organize } from './Organize';
import type { Place } from './Place';
import type { WorldWho } from './WorldWho';
import type { WorldTimeline } from './WorldTimeline';
import type { WorldPlace } from './WorldPlace';
import type { HistoryWho } from './HistoryWho';
import type { HistoryPlace } from './HistoryPlace';
import type { HistoryTimeline } from './HistoryTimeline';
import type { HistoryRelation } from './HistoryRelation';
import type { HistoryOrganize } from './HistoryOrganize';
import type { OrganizePlace } from './OrganizePlace';
import type { OrganizeWho } from './OrganizeWho';
import type { ItemWho } from './ItemWho';
import type { ItemPlace } from './ItemPlace';
import type { ItemOrganize } from './ItemOrganize';
import type { ItemWorld } from './ItemWorld';
import type { Calendar } from './Calendar';

export type StoryDataType = {
  world: World[];
  timeline: Timeline[];
  items: Item[];
  who: Who[];
  Histories: History[];
  organizes: Organize[];
  places: Place[];
  stories: Story[];
  calendars: Calendar[];
  // 关系类型
  worldWho: WorldWho[];
  worldTimeline: WorldTimeline[];
  worldPlace: WorldPlace[];
  historyWho: HistoryWho[];
  historyPlace: HistoryPlace[];
  historyTimeline: HistoryTimeline[];
  historyOrganize: HistoryOrganize[];
  historyRelation: HistoryRelation[];
  organizePlace: OrganizePlace[];
  organizeWho: OrganizeWho[];
  itemWho: ItemWho[];
  itemPlace: ItemPlace[];
  itemOrganize: ItemOrganize[];
  itemWorld: ItemWorld[];
};

/**
 * Story - 表示一个故事
 */
export interface Story {
  id: string;
  name: string;
  description?: string;
  summary?: string;
  map: StoryDataType;
}

const getDefaultStoryData = (): StoryDataType => ({
  world: [],
  timeline: [],
  items: [],
  who: [],
  Histories: [],
  organizes: [],
  places: [],
  stories: [],
  calendars: [],
  worldWho: [],
  worldTimeline: [],
  worldPlace: [],
  historyWho: [],
  historyPlace: [],
  historyTimeline: [],
  historyOrganize: [],
  historyRelation: [],
  organizePlace: [],
  organizeWho: [],
  itemWho: [],
  itemPlace: [],
  itemOrganize: [],
  itemWorld: [],
})

/**
 * 创建一个新的 Story 对象
 */
export function createStory(data: {
  name: string;
  description?: string;
  summary?: string;
}): Story {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    summary: data.summary,
    map: getDefaultStoryData(),
  };
}

/**
 * 从对象创建 Story 数据
 */
export function fromStory(data: Record<string, any>): Story {
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Story: name is required and must be a string');
  }
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Story: id is required and must be a string');
  }
  return {
    name: data.name,
    id: data.id,
    description: data.description,
    summary: data.summary,
    map: Object.assign({}, getDefaultStoryData(), data.map),
  };
}
