import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Item } from './Item';
import type { World } from './World';

/**
 * ItemWorldRole - 物品与世界关系的角色枚举
 */
export enum ItemWorldRole {
  OWNER = 'owner',
  CREATOR = 'creator',
}

/**
 * ItemWorldKey - 物品与世界关系的键
 */
export type ItemWorldKey = 'role' | 'startAt' | 'endAt';

/**
 * ItemWorld - 表示物品与世界之间的关系
 */
export interface ItemWorld {
  id: string;
  itemId: Item['id'];
  worldId: World['id'];
  key: ItemWorldKey;
  value: ItemWorldRole | StoryDate;
}

/**
 * 创建一个新的 ItemWorld 对象
 */
export function createItemWorld(data: {
  itemId: Item['id'];
  worldId: World['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): ItemWorld;
export function createItemWorld(data: {
  itemId: Item['id'];
  worldId: World['id'];
  key: 'role';
  value: ItemWorldRole;
}): ItemWorld;
export function createItemWorld(data: {
  itemId: Item['id'];
  worldId: World['id'];
  key: ItemWorldKey;
  value: ItemWorldRole | StoryDate;
}): ItemWorld {
  validateItemWorld(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    worldId: data.worldId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 ItemWorld 数据
 */
export function fromItemWorld(data: Record<string, any>): ItemWorld {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemWorld: id is required and must be a string');
  }

  const key = data.key as ItemWorldKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    itemId: data.itemId,
    worldId: data.worldId,
    key,
    value,
  };

  validateItemWorld(result);

  return result;
}

function validateItemWorld(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemWorld: itemId is required and must be a string');
  }
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid ItemWorld: worldId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid ItemWorld: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid ItemWorld: value is required');
  }

  if (data.key === 'role' && !Object.values(ItemWorldRole).includes(data.value as ItemWorldRole)) {
    throw new Error('Invalid ItemWorld: role value must be a valid ItemWorldRole');
  }
  return true;
}
