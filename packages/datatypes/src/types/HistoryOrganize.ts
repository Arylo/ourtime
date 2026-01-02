import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { History } from './History';
import type { Organize } from './Organize';

/**
 * HistoryOrganizeRole - 事件与组织关系的角色枚举
 */
export enum HistoryOrganizeRole {
  PARTICIPANT = 'participant',
  WITNESS = 'witness',
  ORGANIZER = 'organizer',
}

/**
 * HistoryOrganizeKey - 事件与组织关系的键
 */
export type HistoryOrganizeKey = 'role' | 'startAt' | 'endAt';

/**
 * HistoryOrganize - 表示事件与组织之间的关系
 */
export interface HistoryOrganize {
  id: string;
  historyId: History['id'];
  organizeId: Organize['id'];
  key: HistoryOrganizeKey;
  value: HistoryOrganizeRole | StoryDate;
}

/**
 * 创建一个新的 HistoryOrganize 对象
 */
export function createHistoryOrganize(data: {
  historyId: History['id'];
  organizeId: Organize['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): HistoryOrganize;
export function createHistoryOrganize(data: {
  historyId: History['id'];
  organizeId: Organize['id'];
  key: 'role';
  value: HistoryOrganizeRole;
}): HistoryOrganize;
export function createHistoryOrganize(data: {
  historyId: History['id'];
  organizeId: Organize['id'];
  key: HistoryOrganizeKey;
  value: HistoryOrganizeRole | StoryDate;
}): HistoryOrganize {
  validateHistoryOrganize(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    organizeId: data.organizeId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 HistoryOrganize 数据
 */
export function fromHistoryOrganize(data: Record<string, any>): HistoryOrganize {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryOrganize: id is required and must be a string');
  }

  const key = data.key as HistoryOrganizeKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    historyId: data.historyId,
    organizeId: data.organizeId,
    key,
    value,
  };

  validateHistoryOrganize(result);

  return result;
}

function validateHistoryOrganize(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryOrganize: historyId is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid HistoryOrganize: organizeId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid HistoryOrganize: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid HistoryOrganize: value is required');
  }

  if (data.key === 'role' && !Object.values(HistoryOrganizeRole).includes(data.value as HistoryOrganizeRole)) {
    throw new Error('Invalid HistoryOrganize: role value must be a valid HistoryOrganizeRole');
  }
  return true;
}
