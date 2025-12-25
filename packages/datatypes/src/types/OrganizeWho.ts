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
 * OrganizeWho - 表示组织与人物之间的关系
 */
export interface OrganizeWho {
  id: string;
  organizeId: Organize['id'];
  whoId: Who['id'];
  role: OrganizeWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}

/**
 * 创建一个新的 OrganizeWho 对象
 */
export function createOrganizeWho(data: {
  organizeId: Organize['id'];
  whoId: Who['id'];
  role: OrganizeWhoRole;
  startAt?: StoryDate;
  endAt?: StoryDate;
}): OrganizeWho {
  return {
    id: ulid(),
    organizeId: data.organizeId,
    whoId: data.whoId,
    role: data.role,
    startAt: data.startAt,
    endAt: data.endAt,
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
  if (!data.role || !Object.values(OrganizeWhoRole).includes(data.role as OrganizeWhoRole)) {
    throw new Error('Invalid OrganizeWho: role is required and must be a valid OrganizeWhoRole');
  }

  return {
    id: data.id,
    organizeId: data.organizeId,
    whoId: data.whoId,
    role: data.role as OrganizeWhoRole,
    startAt: data.startAt ? fromStoryDate(data.startAt) : undefined,
    endAt: data.endAt ? fromStoryDate(data.endAt) : undefined,
  };
}
