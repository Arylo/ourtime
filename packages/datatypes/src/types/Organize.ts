import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Place } from './Place';

/**
 * Organize - 表示一个组织
 */
export interface Organize {
  id: string;
  name: string;
  description?: string;
  startAt?: StoryDate;
  endAt?: StoryDate;
  /** 是否已出场，默认 false */
  appeared?: boolean;
  /** 是否已离场，默认 false */
  departed?: boolean;
}

/**
 * 创建一个新的 Organize 对象
 */
export function createOrganize(data: {
  name: string;
  description?: string;
  startAt?: StoryDate;
  endAt?: StoryDate;
  appeared?: boolean;
  departed?: boolean;
}): Organize {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    startAt: data.startAt,
    endAt: data.endAt,
    appeared: data.appeared ?? false,
    departed: data.departed ?? false,
  };
}

/**
 * 从对象创建 Organize 数据
 */
export function fromOrganize(data: Record<string, any>): Organize {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Organize: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Organize: name is required and must be a string');
  }
  if (data.description !== undefined && typeof data.description !== 'string') {
    throw new Error('Invalid Organize: description is required and must be a string');
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
    appeared: !!data.appeared,
    departed: !!data.departed,
  };
}
