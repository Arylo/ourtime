import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { World } from './World';

/**
 * Place - 表示一个地点
 */
export interface Place {
  id: string;
  name: string;
  description?: string;
  locatedId?: Place['id'];
  startAt?: StoryDate;
  endAt?: StoryDate;
  /** 是否已出场，默认 false */
  appeared?: boolean;
  /** 是否已离场，默认 false */
  departed?: boolean;
}

/**
 * 创建一个新的 Place 对象
 */
export function createPlace(data: {
  name: string;
  description?: string;
  locatedId?: Place['id'];
  startAt?: StoryDate;
  endAt?: StoryDate;
  appeared?: boolean;
  departed?: boolean;
}): Place {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    locatedId: data.locatedId,
    startAt: data.startAt,
    endAt: data.endAt,
    appeared: data.appeared ?? false,
    departed: data.departed ?? false,
  };
}

/**
 * 从对象创建 Place 数据
 */
export function fromPlace(data: Record<string, any>): Place {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Place: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Place: name is required and must be a string');
  }
  if (data.locatedId !== undefined && typeof data.locatedId !== 'string') {
    throw new Error('Invalid Place: locatedId must be a string');
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    locatedId: data.locatedId,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
    appeared: !!data.appeared,
    departed: !!data.departed,
  };
}
