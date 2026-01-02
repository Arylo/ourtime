import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Organize } from './Organize';
import type { Place } from './Place';

/**
 * OrganizePlaceKey - 组织与地点关系的键
 */
export type OrganizePlaceKey = 'startAt' | 'endAt';

/**
 * OrganizePlace - 表示组织与地点之间的关系
 */
export interface OrganizePlace {
  id: string;
  organizeId: Organize['id'];
  placeId: Place['id'];
  key: OrganizePlaceKey;
  value: StoryDate;
}

/**
 * 创建一个新的 OrganizePlace 对象
 */
export function createOrganizePlace(data: {
  organizeId: Organize['id'];
  placeId: Place['id'];
  key: OrganizePlaceKey;
  value: StoryDate;
}): OrganizePlace {
  validateOrganizePlace(data);
  return {
    id: ulid(),
    organizeId: data.organizeId,
    placeId: data.placeId,
    key: data.key,
    value: data.value,
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
  if (!data.key || !['startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid OrganizePlace: key is required and must be startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid OrganizePlace: value is required');
  }

  const key = data.key as OrganizePlaceKey;
  const value = fromStoryDate(data.value);

  const result = {
    id: data.id,
    organizeId: data.organizeId,
    placeId: data.placeId,
    key,
    value,
  };

  validateOrganizePlace(result);

  return result;
}

function validateOrganizePlace(data: Record<string, any>) {
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid OrganizePlace: organizeId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid OrganizePlace: placeId is required and must be a string');
  }
  if (!data.key || !['startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid OrganizePlace: key is required and must be startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid OrganizePlace: value is required');
  }
  return true;
}
