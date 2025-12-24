import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';

/**
 * Item - 表示一个物品
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt?: StoryDate;
  endAt?: StoryDate;
  /** 是否已出场，默认 false */
  appeared?: boolean;
}

/**
 * 创建一个新的 Item 对象
 */
export function createItem(data: {
  name: string;
  description: string;
  createdAt?: StoryDate;
  endAt?: StoryDate;
  appeared?: boolean;
}): Item {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    createdAt: data.createdAt,
    endAt: data.endAt,
    appeared: data.appeared ?? false,
  };
}

/**
 * 从对象创建 Item 数据
 */
export function fromItem(data: Record<string, any>): Item {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Item: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Item: name is required and must be a string');
  }
  if (!data.description || typeof data.description !== 'string') {
    throw new Error('Invalid Item: description is required and must be a string');
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    createdAt: data.createdAt ? fromStoryDate(data.createdAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
    appeared: !!data.appeared,
  };
}
