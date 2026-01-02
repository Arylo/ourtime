import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { History } from './History';
import type { Place } from './Place';

/**
 * HistoryPlaceRole - 事件与地点关系的角色枚举
 */
export enum HistoryPlaceRole {
  OCCURRED_IN = 'occurred_in',
}

/**
 * HistoryPlaceKey - 事件与地点关系的键
 */
export type HistoryPlaceKey = 'role' | 'startAt' | 'endAt';

/**
 * HistoryPlace - 表示事件与地点之间的关系
 */
export interface HistoryPlace {
  id: string;
  historyId: History['id'];
  placeId: Place['id'];
  key: HistoryPlaceKey;
  value: HistoryPlaceRole | StoryDate;
}

/**
 * 创建一个新的 HistoryPlace 对象
 */
export function createHistoryPlace(data: {
  historyId: History['id'];
  placeId: Place['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): HistoryPlace;
export function createHistoryPlace(data: {
  historyId: History['id'];
  placeId: Place['id'];
  key: 'role';
  value: HistoryPlaceRole;
}): HistoryPlace;
export function createHistoryPlace(data: {
  historyId: History['id'];
  placeId: Place['id'];
  key: HistoryPlaceKey;
  value: HistoryPlaceRole | StoryDate;
}): HistoryPlace {
  validateHistoryPlace(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    placeId: data.placeId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 HistoryPlace 数据
 */
export function fromHistoryPlace(data: Record<string, any>): HistoryPlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryPlace: id is required and must be a string');
  }

  const key = data.key as HistoryPlaceKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    historyId: data.historyId,
    placeId: data.placeId,
    key,
    value,
  };

  validateHistoryPlace(result);

  return result;
}

function validateHistoryPlace(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryPlace: historyId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid HistoryPlace: placeId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid HistoryPlace: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid HistoryPlace: value is required');
  }

  if (data.key === 'role' && !Object.values(HistoryPlaceRole).includes(data.value as HistoryPlaceRole)) {
    throw new Error('Invalid HistoryPlace: role value must be a valid HistoryPlaceRole');
  }
  return true;
}
