import { ulid } from 'ulid';

/**
 * History - 表示一个事件
 */
export interface History {
  id: string;
  name: string;
  alias?: string[];
  parentEvent?: History['id'];
}

/**
 * 创建一个新的 History 对象
 */
export function createHistory(data: {
  name: string;
  alias?: string[];
  parentEvent?: History['id'];
}): History {
  return {
    id: ulid(),
    name: data.name,
    alias: data.alias,
    parentEvent: data.parentEvent,
  };
}

/**
 * 从对象创建 History 数据
 */
export function fromHistory(data: Record<string, any>): History {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid History: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid History: name is required and must be a string');
  }

  // alias is optional, but if present must be an array of strings
  if (data.alias !== undefined && !Array.isArray(data.alias)) {
    throw new Error('Invalid History: alias must be an array when provided');
  }

  // parentEvent is optional, but if present must be a string id
  if (data.parentEvent !== undefined && typeof data.parentEvent !== 'string') {
    throw new Error('Invalid History: parentEvent must be a string when provided');
  }

  return {
    id: data.id,
    name: data.name,
    alias: data.alias,
    parentEvent: data.parentEvent,
  };
}
