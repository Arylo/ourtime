import { ulid } from 'ulid';
import type { World } from './World';
import type { Place } from './Place';

/**
 * WorldPlace - 表示世界与地点之间的关系
 */
export interface WorldPlace {
  id: string;
  worldId: World['id'];
  placeId: Place['id'];
}

/**
 * 创建一个新的 WorldPlace 对象
 */
export function createWorldPlace(data: {
  worldId: World['id'];
  placeId: Place['id'];
}): WorldPlace {
  return {
    id: ulid(),
    worldId: data.worldId,
    placeId: data.placeId,
  };
}

/**
 * 从对象创建 WorldPlace 数据
 */
export function fromWorldPlace(data: Record<string, any>): WorldPlace {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid WorldPlace: id is required and must be a string');
  }
  if (!data.worldId || typeof data.worldId !== 'string') {
    throw new Error('Invalid WorldPlace: worldId is required and must be a string');
  }
  if (!data.placeId || typeof data.placeId !== 'string') {
    throw new Error('Invalid WorldPlace: placeId is required and must be a string');
  }

  return {
    id: data.id,
    worldId: data.worldId,
    placeId: data.placeId,
  };
}
