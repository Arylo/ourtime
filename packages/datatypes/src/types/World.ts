import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';

/**
 * World - 表示一个独立的世界观
 */
export interface World {
  name: string;
  id: string;
  startAt?: StoryDate;
  endAt?: StoryDate;
  parents?: World['id'][];
}

/**
 * 创建一个新的 World 对象
 */
export function createWorld(data: {
  name: string;
  startAt?: StoryDate;
  endAt?: StoryDate;
  parents?: World['id'][];
}): World {
  return {
    id: ulid(),
    name: data.name,
    startAt: data.startAt,
    endAt: data.endAt,
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
  return {
    name: data.name,
    id: data.id,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
    parents: data.parents,
  };
}
