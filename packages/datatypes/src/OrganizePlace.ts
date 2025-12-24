import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Organize } from './Organize';
import type { Place } from './Place';

/**
 * OrganizePlace - 表示组织与地点之间的关系
 */
export interface OrganizePlace {
  id: string;
  organizeId: Organize['id'];
  placeId: Place['id'];
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 OrganizePlace 对象
 */
export function createOrganizePlace(data: {
  organizeId: Organize['id'];
  placeId: Place['id'];
  startAt?: StoryDate;
  endAt?: StoryDate;
}): OrganizePlace {
  return {
    id: ulid(),
    organizeId: data.organizeId,
    placeId: data.placeId,
    startAt: data.startAt,
    endAt: data.endAt,
  };
}

/**
 * 从对象创建 OrganizePlace 数据
 */
export function fromOrganizePlace(data: Record<string, any>): OrganizePlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid OrganizePlace: id is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid OrganizePlace: organizeId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid OrganizePlace: placeId is required and must be a string');
  }

  return {
    id: data.id,
    organizeId: data.organizeId,
    placeId: data.placeId,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
