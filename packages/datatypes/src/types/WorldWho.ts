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
 * WorldWhoKey - 世界与人物关系的键
 */
export type WorldWhoKey = 'role' | 'startAt' | 'endAt';

/**
 * WorldWho - 表示世界与人物之间的关系（如主人、守护者等）
 */
export interface WorldWho {
  id: string;
  worldId: World['id'];
  whoId: Who['id'];
  key: WorldWhoKey;
  value: WorldWhoRole | StoryDate;
}

/**
 * 创建一个新的 WorldWho 对象
 */
export function createWorldWho(data: {
  worldId: World['id'];
  whoId: Who['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): WorldWho;
export function createWorldWho(data: {
  worldId: World['id'];
  whoId: Who['id'];
  key: 'role';
  value: WorldWhoRole;
}): WorldWho;
export function createWorldWho(data: {
  worldId: World['id'];
  whoId: Who['id'];
  key: WorldWhoKey;
  value: WorldWhoRole | StoryDate;
}): WorldWho {
  validateWorldWho(data);
  return {
    id: ulid(),
    worldId: data.worldId,
    whoId: data.whoId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 WorldWho 数据
 */
export function fromWorldWho(data: Record<string, any>): WorldWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid WorldWho: id is required and must be a string');
  }

  const key = data.key as WorldWhoKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    worldId: data.worldId,
    whoId: data.whoId,
    key,
    value,
  };

  validateWorldWho(result);

  return result;
}

function validateWorldWho(data: Record<string, any>) {
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid WorldWho: worldId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid WorldWho: whoId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid WorldWho: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid WorldWho: value is required');
  }

  if (data.key === 'role' && !Object.values(WorldWhoRole).includes(data.value as WorldWhoRole)) {
    throw new Error('Invalid WorldWho: role value must be a valid WorldWhoRole');
  }
  return true;
}
