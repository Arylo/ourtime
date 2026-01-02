import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Item } from './Item';
import type { Organize } from './Organize';

/**
 * ItemOrganizeRole - 物品与组织关系的角色枚举
 */
export enum ItemOrganizeRole {
  OWNER = 'owner',
}

/**
 * ItemOrganizeKey - 物品与组织关系的键
 */
export type ItemOrganizeKey = 'role' | 'startAt' | 'endAt';

/**
 * ItemOrganize - 表示物品与组织之间的关系
 */
export interface ItemOrganize {
  id: string;
  itemId: Item['id'];
  organizeId: Organize['id'];
  key: ItemOrganizeKey;
  value: ItemOrganizeRole | StoryDate;
}

/**
 * 创建一个新的 ItemOrganize 对象
 */
export function createItemOrganize(data: {
  itemId: Item['id'];
  organizeId: Organize['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): ItemOrganize;
export function createItemOrganize(data: {
  itemId: Item['id'];
  organizeId: Organize['id'];
  key: 'role';
  value: ItemOrganizeRole;
}): ItemOrganize;
export function createItemOrganize(data: {
  itemId: Item['id'];
  organizeId: Organize['id'];
  key: ItemOrganizeKey;
  value: ItemOrganizeRole | StoryDate;
}): ItemOrganize {
  validateItemOrganize(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    organizeId: data.organizeId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 ItemOrganize 数据
 */
export function fromItemOrganize(data: Record<string, any>): ItemOrganize {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemOrganize: id is required and must be a string');
  }

  const key = data.key as ItemOrganizeKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    itemId: data.itemId,
    organizeId: data.organizeId,
    key,
    value,
  };

  validateItemOrganize(result);

  return result;
}

function validateItemOrganize(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemOrganize: itemId is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid ItemOrganize: organizeId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid ItemOrganize: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid ItemOrganize: value is required');
  }

  if (data.key === 'role' && !Object.values(ItemOrganizeRole).includes(data.value as ItemOrganizeRole)) {
    throw new Error('Invalid ItemOrganize: role value must be a valid ItemOrganizeRole');
  }
  return true;
}
