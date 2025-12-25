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
 * ItemOrganize - 表示物品与组织之间的关系
 */
export interface ItemOrganize {
  id: string;
  itemId: Item['id'];
  organizeId: Organize['id'];
  role: ItemOrganizeRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 ItemOrganize 对象
 */
export function createItemOrganize(data: {
  itemId: Item['id'];
  organizeId: Organize['id'];
  role: ItemOrganizeRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): ItemOrganize {
  return {
    id: ulid(),
    itemId: data.itemId,
    organizeId: data.organizeId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 ItemOrganize 数据
 */
export function fromItemOrganize(data: Record<string, any>): ItemOrganize {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid ItemOrganize: id is required and must be a string');
  }
  if (!data.itemId || typeof data.itemId !== 'string') {
    throw new Error('Invalid ItemOrganize: itemId is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid ItemOrganize: organizeId is required and must be a string');
  }
  if (!data.role || !Object.values(ItemOrganizeRole).includes(data.role as ItemOrganizeRole)) {
    throw new Error('Invalid ItemOrganize: role is required and must be a valid ItemOrganizeRole');
  }

  return {
    id: data.id,
    itemId: data.itemId,
    organizeId: data.organizeId,
    role: data.role as ItemOrganizeRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
