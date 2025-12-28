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
 * ItemPlace - 表示物品与地点之间的关系
 */
export interface ItemPlace {
  id: string;
  itemId: Item['id'];
  placeId: Place['id'];
  role: ItemPlaceRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 ItemPlace 对象
 */
export function createItemPlace(data: {
  itemId: Item['id'];
  placeId: Place['id'];
  role: ItemPlaceRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): ItemPlace {
  validateItemPlace(data);
  return {
    id: ulid(),
    itemId: data.itemId,
    placeId: data.placeId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 ItemPlace 数据
 */
export function fromItemPlace(data: Record<string, any>): ItemPlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemPlace: id is required and must be a string');
  }
  validateItemPlace(data);

  return {
    id: data.id,
    itemId: data.itemId,
    placeId: data.placeId,
    role: data.role as ItemPlaceRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}

function validateItemPlace(data: Record<string, any>) {
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemPlace: itemId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid ItemPlace: placeId is required and must be a string');
  }
  if (!data.role || !Object.values(ItemPlaceRole).includes(data.role as ItemPlaceRole)) {
    throw new Error('Invalid ItemPlace: role is required and must be a valid ItemPlaceRole');
  }
  return true;
}
