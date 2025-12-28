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
 * HistoryPlace - 表示事件与地点之间的关系
 */
export interface HistoryPlace {
  id: string;
  historyId: History['id'];
  placeId: Place['id'];
  role: HistoryPlaceRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 HistoryPlace 对象
 */
export function createHistoryPlace(data: {
  historyId: History['id'];
  placeId: Place['id'];
  role: HistoryPlaceRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): HistoryPlace {
  validateHistoryPlace(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    placeId: data.placeId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 HistoryPlace 数据
 */
export function fromHistoryPlace(data: Record<string, any>): HistoryPlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryPlace: id is required and must be a string');
  }
  validateHistoryPlace(data);

  return {
    id: data.id,
    historyId: data.historyId,
    placeId: data.placeId,
    role: data.role as HistoryPlaceRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}

function validateHistoryPlace(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryPlace: historyId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid HistoryPlace: placeId is required and must be a string');
  }
  if (!data.role || !Object.values(HistoryPlaceRole).includes(data.role as HistoryPlaceRole)) {
    throw new Error('Invalid HistoryPlace: role is required and must be a valid HistoryPlaceRole');
  }
  return true;
}
