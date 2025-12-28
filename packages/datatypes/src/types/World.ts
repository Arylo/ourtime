import { ulid } from 'ulid';
import { StoryDate, createStoryDate, fromStoryDate } from './StoryDate';

/**
 * World - 表示一个独立的世界观
 */
export interface World {
  name: string;
  id: string;
  description?: string;
  startAt: StoryDate;
  endAt: StoryDate;
  parents?: World['id'][];
}

/**
 * 创建一个新的 World 对象
 */
export function createWorld(data: {
  name: string;
  description?: string;
  startAt?: StoryDate;
  endAt?: StoryDate;
  parents?: World['id'][];
}): World {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    startAt: data.startAt ?? createStoryDate({ isUnknown: true }),
    endAt: data.endAt ?? createStoryDate({ isUnknown: true }),
    parents: data.parents,
  };
}

/**
 * 从对象创建 World 数据
 */
export function fromWorld(data: Record<string, any>): World {
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid World: name is required and must be a string');
  }
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid World: id is required and must be a string');
  }
  if (!data.startAt) {
    throw new Error('Invalid World: startAt is required');
  }
  if (!data.endAt) {
    throw new Error('Invalid World: endAt is required');
  }
  return {
    name: data.name,
    id: data.id,
    description: data.description,
    startAt: fromStoryDate(data.startAt),
    endAt: fromStoryDate(data.endAt),
    parents: data.parents,
  };
}
