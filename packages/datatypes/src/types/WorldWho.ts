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
  role: WorldWhoRole; // Made required
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 验证 WorldWho 的 role 字段
 */
function validateWorldWho(data: Record<string, any>) {
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid WorldWho: worldId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid WorldWho: whoId is required and must be a string');
  }
  if (!data.role || !Object.values(WorldWhoRole).includes(data.role as WorldWhoRole)) {
    throw new Error('Invalid WorldWho: role is required and must be a valid WorldWhoRole');
  }
  return true;
}

/**
 * 创建一个新的 WorldWho 对象
 */
export function createWorldWho(data: Omit<WorldWho, 'id'>): WorldWho {
  validateWorldWho(data);

  return {
    id: ulid(),
    worldId: data.worldId,
    whoId: data.whoId,
    role: data.role, // Ensure role is passed
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
  validateWorldWho(data);

  return {
    id: data.id,
    worldId: data.worldId,
    whoId: data.whoId,
    role: data.role as WorldWhoRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
