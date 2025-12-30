import { ulid } from 'ulid';

/**
 * Who - 表示一个人物
 */
export interface Who {
  id: string;
  name: string;
  description?: string;
  alias?: string[];
  parents?: Who['id'][];
  /** 是否已出场，默认 false */
  appeared?: boolean;
  /** 是否已离场，默认 false */
  departed?: boolean;
}

/**
 * 创建一个新的 Who 对象
 */
export function createWho(data: {
  name: string;
  description?: string;
  alias?: string[];
  parents?: Who['id'][];
  appeared?: boolean;
  departed?: boolean;
}): Who {
  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    alias: data.alias,
    parents: data.parents,
    appeared: data.appeared ?? false,
    departed: data.departed ?? false,
  };
}

/**
 * 从对象创建 Who 数据
 */
export function fromWho(data: Record<string, any>): Who {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Who: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Who: name is required and must be a string');
  }
  if (data.description !== undefined && typeof data.description !== 'string') {
    throw new Error('Invalid Who: description is required and must be a string');
  }

  return {
    id: data.id,
    name: data.name,
    alias: data.alias,
    parents: data.parents,
    appeared: !!data.appeared,
    departed: !!data.departed,
    description: data.description,
  };
}
