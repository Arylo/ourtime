import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { History } from './History';
import type { World } from './World';

/**
 * HistoryWorldRole - 事件与世界关系的角色枚举
 */
export enum HistoryWorldRole {
  OCCURRED_IN = 'occurred_in',
}

/**
 * HistoryWorld - 表示事件与世界之间的关系
 */
export interface HistoryWorld {
  id: string;
  historyId: History['id'];
  worldId: World['id'];
  role: HistoryWorldRole;
}

/**
 * 创建一个新的 HistoryWorld 对象
 */
export function createHistoryWorld(data: {
  historyId: History['id'];
  worldId: World['id'];
  role: HistoryWorldRole;
}): HistoryWorld {
  return {
    id: ulid(),
    historyId: data.historyId,
    worldId: data.worldId,
    role: data.role,
  };
}

/**
 * 从对象创建 HistoryWorld 数据
 */
export function fromHistoryWorld(data: Record<string, any>): HistoryWorld {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryWorld: id is required and must be a string');
  }
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryWorld: historyId is required and must be a string');
  }
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid HistoryWorld: worldId is required and must be a string');
  }
  if (!data.role || !Object.values(HistoryWorldRole).includes(data.role as HistoryWorldRole)) {
    throw new Error('Invalid HistoryWorld: role is required and must be a valid HistoryWorldRole');
  }

  return {
    id: data.id,
    historyId: data.historyId,
    worldId: data.worldId,
    role: data.role as HistoryWorldRole,
  };
}
