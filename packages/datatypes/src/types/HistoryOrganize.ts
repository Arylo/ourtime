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
 * HistoryOrganize - 表示事件与组织之间的关系
 */
export interface HistoryOrganize {
  id: string;
  historyId: History['id'];
  organizeId: Organize['id'];
  role: HistoryOrganizeRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 HistoryOrganize 对象
 */
export function createHistoryOrganize(data: {
  historyId: History['id'];
  organizeId: Organize['id'];
  role: HistoryOrganizeRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): HistoryOrganize {
  validateHistoryOrganize(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    organizeId: data.organizeId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 HistoryOrganize 数据
 */
export function fromHistoryOrganize(data: Record<string, any>): HistoryOrganize {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryOrganize: id is required and must be a string');
  }
  validateHistoryOrganize(data);

  return {
    id: data.id,
    historyId: data.historyId,
    organizeId: data.organizeId,
    role: data.role as HistoryOrganizeRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}

function validateHistoryOrganize(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryOrganize: historyId is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid HistoryOrganize: organizeId is required and must be a string');
  }
  if (!data.role || !Object.values(HistoryOrganizeRole).includes(data.role as HistoryOrganizeRole)) {
    throw new Error('Invalid HistoryOrganize: role is required and must be a valid HistoryOrganizeRole');
  }
  return true;
}
