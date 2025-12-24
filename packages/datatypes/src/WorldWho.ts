import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { World } from './World';
import type { Who } from './Who';

/**
 * WorldWhoRole - 世界与人物关系的角色枚举
 */
export enum WorldWhoRole {
  OWNER = 'owner',
  PARENT = 'parent',
}

/**
 * WorldWho - 表示世界与人物之间的关系（如主人、守护者等）
 */
export interface WorldWho {
  id: string;
  worldId: World['id'];
  whoId: Who['id'];
  role?: WorldWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 WorldWho 对象
 */
export function createWorldWho(data: {
  worldId: World['id'];
  whoId: Who['id'];
  role?: WorldWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): WorldWho {
  return {
    id: ulid(),
    worldId: data.worldId,
    whoId: data.whoId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 WorldWho 数据
 */
export function fromWorldWho(data: Record<string, any>): WorldWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid WorldWho: id is required and must be a string');
  }
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid WorldWho: worldId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid WorldWho: whoId is required and must be a string');
  }

  return {
    id: data.id,
    worldId: data.worldId,
    whoId: data.whoId,
    role: data.role as WorldWhoRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
