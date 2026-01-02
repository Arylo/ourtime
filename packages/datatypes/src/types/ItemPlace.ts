import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Item } from './Item';
import type { Place } from './Place';

/**
 * ItemPlaceRole - 物品与地点关系的角色枚举
 */
export enum ItemPlaceRole {
  OWNER = 'owner',
  CREATOR = 'creator',
}

/**
 * ItemPlaceKey - 物品与地点关系的键
 */
export type ItemPlaceKey = 'role' | 'startAt' | 'endAt';

/**
 * ItemPlace - 表示物品与地点之间的关系
 */
export interface ItemPlace {
  id: string;
  itemId: Item['id'];
  placeId: Place['id'];
  key: ItemPlaceKey;
  value: ItemPlaceRole | StoryDate;
}

/**
 * 创建一个新的 ItemPlace 对象
 */
export function createItemPlace(data: {
  itemId: Item['id'];
  placeId: Place['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): ItemPlace;
export function createItemPlace(data: {
  itemId: Item['id'];
  placeId: Place['id'];
  key: 'role';
  value: ItemPlaceRole;
}): ItemPlace;
export function createItemPlace(data: {
  itemId: Item['id'];
  placeId: Place['id'];
  key: ItemPlaceKey;
  value: ItemPlaceRole | StoryDate;
}): ItemPlace {
  validateItemPlace(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    placeId: data.placeId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 ItemPlace 数据
 */
export function fromItemPlace(data: Record<string, any>): ItemPlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemPlace: id is required and must be a string');
  }

  const key = data.key as ItemPlaceKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    itemId: data.itemId,
    placeId: data.placeId,
    key,
    value,
  };

  validateItemPlace(result);

  return result;
}

function validateItemPlace(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemPlace: itemId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid ItemPlace: placeId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid ItemPlace: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid ItemPlace: value is required');
  }

  if (data.key === 'role' && !Object.values(ItemPlaceRole).includes(data.value as ItemPlaceRole)) {
    throw new Error('Invalid ItemPlace: role value must be a valid ItemPlaceRole');
  }
  return true;
}
