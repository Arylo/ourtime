import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { History } from './History';
import type { Who } from './Who';

/**
 * HistoryWhoRole - 事件与人物关系的角色枚举
 */
export enum HistoryWhoRole {
  PARTICIPANT = 'participant',
  WITNESS = 'witness',
  ORGANIZER = 'organizer',
}

/**
 * HistoryWhoKey - 事件与人物关系的键
 */
export type HistoryWhoKey = 'role' | 'startAt' | 'endAt';

/**
 * HistoryWho - 表示事件与人物之间的关系
 */
export interface HistoryWho {
  id: string;
  historyId: History['id'];
  whoId: Who['id'];
  key: HistoryWhoKey;
  value: HistoryWhoRole | StoryDate;
}

/**
 * 创建一个新的 HistoryWho 对象
 */
export function createHistoryWho(data: {
  historyId: History['id'];
  whoId: Who['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): HistoryWho;
export function createHistoryWho(data: {
  historyId: History['id'];
  whoId: Who['id'];
  key: 'role';
  value: HistoryWhoRole;
}): HistoryWho;
export function createHistoryWho(data: {
  historyId: History['id'];
  whoId: Who['id'];
  key: HistoryWhoKey;
  value: HistoryWhoRole | StoryDate;
}): HistoryWho {
  validateHistoryWho(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    whoId: data.whoId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 HistoryWho 数据
 */
export function fromHistoryWho(data: Record<string, any>): HistoryWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryWho: id is required and must be a string');
  }

  const key = data.key as HistoryWhoKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    historyId: data.historyId,
    whoId: data.whoId,
    key,
    value,
  };

  validateHistoryWho(result);

  return result;
}

function validateHistoryWho(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryWho: historyId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid HistoryWho: whoId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid HistoryWho: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid HistoryWho: value is required');
  }
  return true;
}
