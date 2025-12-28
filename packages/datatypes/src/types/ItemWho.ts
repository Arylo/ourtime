import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Item } from './Item';
import type { Who } from './Who';

/**
 * ItemWhoRole - 物品与人物关系的角色枚举
 */
export enum ItemWhoRole {
  OWNER = 'owner',
  CREATOR = 'creator',
}

/**
 * ItemWho - 表示物品与人物之间的关系
 */
export interface ItemWho {
  id: string;
  itemId: Item['id'];
  whoId: Who['id'];
  role: ItemWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 ItemWho 对象
 */
export function createItemWho(data: {
  itemId: Item['id'];
  whoId: Who['id'];
  role: ItemWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): ItemWho {
  validateItemWho(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    whoId: data.whoId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 ItemWho 数据
 */
export function fromItemWho(data: Record<string, any>): ItemWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemWho: id is required and must be a string');
  }
  validateItemWho(data);

  return {
    id: data.id,
    itemId: data.itemId,
    whoId: data.whoId,
    role: data.role as ItemWhoRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}

function validateItemWho(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemWho: itemId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid ItemWho: whoId is required and must be a string');
  }
  if (!data.role || !Object.values(ItemWhoRole).includes(data.role as ItemWhoRole)) {
    throw new Error('Invalid ItemWho: role is required and must be a valid ItemWhoRole');
  }
  return true;
}
