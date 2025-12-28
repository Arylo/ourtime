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
 * HistoryWho - 表示事件与人物之间的关系
 */
export interface HistoryWho {
  id: string;
  historyId: History['id'];
  whoId: Who['id'];
  role: HistoryWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 HistoryWho 对象
 */
export function createHistoryWho(data: {
  historyId: History['id'];
  whoId: Who['id'];
  role: HistoryWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): HistoryWho {
  validateHistoryWho(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    whoId: data.whoId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 HistoryWho 数据
 */
export function fromHistoryWho(data: Record<string, any>): HistoryWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryWho: id is required and must be a string');
  }
  validateHistoryWho(data);

  return {
    id: data.id,
    historyId: data.historyId,
    whoId: data.whoId,
    role: data.role as HistoryWhoRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}

function validateHistoryWho(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryWho: historyId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid HistoryWho: whoId is required and must be a string');
  }
  if (!data.role || !Object.values(HistoryWhoRole).includes(data.role as HistoryWhoRole)) {
    throw new Error('Invalid HistoryWho: role is required and must be a valid HistoryWhoRole');
  }
  return true;
}
