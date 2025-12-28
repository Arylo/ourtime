import { ulid } from 'ulid';
import type { World } from './World';
import type { Timeline } from './Timeline';

/**
 * WorldTimeline - 表示世界与时间线之间的关系
 */
export interface WorldTimeline {
  id: string;
  worldId: World['id'];
  timelineId: Timeline['id'];
}

/**
 * 创建一个新的 WorldTimeline 对象
 */
export function createWorldTimeline(data: {
  worldId: World['id'];
  timelineId: Timeline['id'];
}): WorldTimeline {
  validateWorldTimeline(data);
  return {
    id: ulid(),
    worldId: data.worldId,
    timelineId: data.timelineId,
  };
}

/**
 * 从对象创建 WorldTimeline 数据
 */
export function fromWorldTimeline(data: Record<string, any>): WorldTimeline {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid WorldTimeline: id is required and must be a string');
  }
  validateWorldTimeline(data);

  return {
    id: data.id,
    worldId: data.worldId,
    timelineId: data.timelineId,
  };
}

function validateWorldTimeline(data: Record<string, any>) {
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid WorldTimeline: worldId is required and must be a string');
  }
  if (!data.timelineId || typeof data.timelineId !== 'string') {
    throw new Error('Invalid WorldTimeline: timelineId is required and must be a string');
  }
  return true;
}
