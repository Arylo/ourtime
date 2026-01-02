import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';
import type { Organize } from './Organize';
import type { Who } from './Who';

/**
 * OrganizeWhoRole - 组织与人物关系的角色枚举
 */
export enum OrganizeWhoRole {
  MEMBER = 'member',
  LEADER = 'leader',
}

/**
 * OrganizeWhoKey - 组织与人物关系的键
 */
export type OrganizeWhoKey = 'role' | 'startAt' | 'endAt';

/**
 * OrganizeWho - 表示组织与人物之间的关系
 */
export interface OrganizeWho {
  id: string;
  organizeId: Organize['id'];
  whoId: Who['id'];
  key: OrganizeWhoKey;
  value: OrganizeWhoRole | StoryDate;
}

/**
 * 创建一个新的 OrganizeWho 对象
 */
export function createOrganizeWho(data: {
  organizeId: Organize['id'];
  whoId: Who['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): OrganizeWho;
export function createOrganizeWho(data: {
  organizeId: Organize['id'];
  whoId: Who['id'];
  key: 'role';
  value: OrganizeWhoRole;
}): OrganizeWho;
export function createOrganizeWho(data: {
  organizeId: Organize['id'];
  whoId: Who['id'];
  key: OrganizeWhoKey;
  value: OrganizeWhoRole | StoryDate;
}): OrganizeWho {
  validateOrganizeWho(data);
  return {
    id: ulid(),
    organizeId: data.organizeId,
    whoId: data.whoId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 OrganizeWho 数据
 */
export function fromOrganizeWho(data: Record<string, any>): OrganizeWho {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid OrganizeWho: id is required and must be a string');
  }
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid OrganizeWho: organizeId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid OrganizeWho: whoId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid OrganizeWho: key is required and must be role, startAt or endAt');
  }

  const key = data.key as OrganizeWhoKey;
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

  const result = {
    id: data.id,
    organizeId: data.organizeId,
    whoId: data.whoId,
    key,
    value,
  };

  validateOrganizeWho(result);

  return result;
}

function validateOrganizeWho(data: Record<string, any>) {
  if (!data.organizeId || typeof data.organizeId !== 'string') {
    throw new Error('Invalid OrganizeWho: organizeId is required and must be a string');
  }
  if (!data.whoId || typeof data.whoId !== 'string') {
    throw new Error('Invalid OrganizeWho: whoId is required and must be a string');
  }
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid OrganizeWho: key is required and must be role, startAt or endAt');
  }
  if (data.value === undefined) {
    throw new Error('Invalid OrganizeWho: value is required');
  }

  if (data.key === 'role' && !Object.values(OrganizeWhoRole).includes(data.value as OrganizeWhoRole)) {
    throw new Error('Invalid OrganizeWho: role value must be a valid OrganizeWhoRole');
  }
  return true;
}
