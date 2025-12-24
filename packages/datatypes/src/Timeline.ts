import { ulid } from 'ulid';
import { StoryDate, fromStoryDate } from './StoryDate';

/**
 * Timeline - 表示一条时间线
 */
export interface Timeline {
  id: string;
  name: string;
  baseOn?: Timeline['id'];
  baseAt?: StoryDate;
  speed?: number;
}

/**
 * 创建一个新的 Timeline 对象
 */
export function createTimeline(data: {
  name: string;
  baseOn?: Timeline['id'];
  baseAt?: StoryDate;
  speed?: number;
}): Timeline {
  // 验证：如果提供了baseOn，必须同时提供baseAt
  if (data?.baseOn !== undefined && data?.baseAt === undefined) {
    throw new Error('Invalid Timeline: baseAt is required when baseOn is provided');
  }
  // 验证：如果提供了baseAt，必须同时提供baseOn
  if (data?.baseAt !== undefined && data?.baseOn === undefined) {
    throw new Error('Invalid Timeline: baseOn is required when baseAt is provided');
  }

  return {
    id: ulid(),
    name: data.name,
    baseOn: data?.baseOn,
    baseAt: data?.baseAt,
    speed: data?.speed ?? 1.0,
  };
}
/**
 * 从对象创建 Timeline 数据
 */
export function fromTimeline(data: Record<string, any>): Timeline {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Timeline: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Timeline: name is required and must be a string');
  }

  // 验证：如果提供了baseOn，必须同时提供baseAt
  if (data.baseOn !== undefined && data.baseAt === undefined) {
    throw new Error('Invalid Timeline: baseAt is required when baseOn is provided');
  }
  // 验证：如果提供了baseAt，必须同时提供baseOn
  if (data.baseAt !== undefined && data.baseOn === undefined) {
    throw new Error('Invalid Timeline: baseOn is required when baseAt is provided');
  }

  return {
    id: data.id,
    name: data.name,
    baseOn: data.baseOn,
    baseAt: data.baseAt ? fromStoryDate(data.baseAt) : undefined,
    speed: data.speed ?? 1.0,
  }
}
