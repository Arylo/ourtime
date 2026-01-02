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
 * ItemWhoKey - 物品与人物关系的键
 */
export type ItemWhoKey = 'role' | 'startAt' | 'endAt';

/**
 * ItemWho - 表示物品与人物之间的关系
 */
export interface ItemWho {
  id: string;
  itemId: Item['id'];
  whoId: Who['id'];
  key: ItemWhoKey;
  value: ItemWhoRole | StoryDate;
}

/**
 * 创建一个新的 ItemWho 对象
 */
export function createItemWho(data: {
  itemId: Item['id'];
  whoId: Who['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): ItemWho;
export function createItemWho(data: {
  itemId: Item['id'];
  whoId: Who['id'];
  key: 'role';
  value: ItemWhoRole;
}): ItemWho;
export function createItemWho(data: {
  itemId: Item['id'];
  whoId: Who['id'];
  key: ItemWhoKey;
  value: ItemWhoRole | StoryDate;
}): ItemWho {
  validateItemWho(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    whoId: data.whoId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 ItemWho 数据
 */
export function fromItemWho(data: Record<string, any>): ItemWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemWho: id is required and must be a string');
  }

  const key = data.key as ItemWhoKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    itemId: data.itemId,
    whoId: data.whoId,
    key,
    value,
  };

  validateItemWho(result);

  return result;
}

function validateItemWho(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemWho: itemId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid ItemWho: whoId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid ItemWho: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid ItemWho: value is required');
  }

  if (data.key === 'role' && !Object.values(ItemWhoRole).includes(data.value as ItemWhoRole)) {
    throw new Error('Invalid ItemWho: role value must be a valid ItemWhoRole');
  }
  return true;
}
