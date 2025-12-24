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
 * ItemWorld - 表示物品与世界之间的关系
 */
export interface ItemWorld {
  id: string;
  itemId: Item['id'];
  worldId: World['id'];
  role: ItemWorldRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 ItemWorld 对象
 */
export function createItemWorld(data: {
  itemId: Item['id'];
  worldId: World['id'];
  role: ItemWorldRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): ItemWorld {
  return {
    id: ulid(),
    itemId: data.itemId,
    worldId: data.worldId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 ItemWorld 数据
 */
export function fromItemWorld(data: Record<string, any>): ItemWorld {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemWorld: id is required and must be a string');
  }
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemWorld: itemId is required and must be a string');
  }
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid ItemWorld: worldId is required and must be a string');
  }
  if (!data.role || !Object.values(ItemWorldRole).includes(data.role as ItemWorldRole)) {
    throw new Error('Invalid ItemWorld: role is required and must be a valid ItemWorldRole');
  }

  return {
    id: data.id,
    itemId: data.itemId,
    worldId: data.worldId,
    role: data.role as ItemWorldRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
