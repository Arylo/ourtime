import { ulid } from 'ulid';
import { World } from './World';
import { Organize } from './Organize';
import { Item } from './Item';
import { Place } from './Place';
import { Who } from './Who';


interface BaseHistoryAffected {
  id: string;
  /** 受影响的实体类型 */
  entityType: 'world' | 'who' | 'place' | 'item' | 'organize';
}

interface HistoryWorldAffected extends BaseHistoryAffected {
  entityType: 'world';
  entityId: World['id'];
  data: Partial<Omit<World, 'id'>>;
}

interface HistoryOrganizeAffected extends BaseHistoryAffected {
  entityType: 'organize';
  entityId: Organize['id'];
  data: Partial<Omit<Organize, 'id'>>;
}

interface HistoryWhoAffected extends BaseHistoryAffected {
  entityType: 'who';
  entityId: Who['id'];
  data: Partial<Omit<Who, 'id'>>;
}

interface HistoryPlaceAffected extends BaseHistoryAffected {
  entityType: 'place';
  entityId: Place['id'];
  data: Partial<Omit<Place, 'id'>>;
}

interface HistoryItemAffected extends BaseHistoryAffected {
  entityType: 'item';
  entityId: Item['id'];
  data: Partial<Omit<Item, 'id'>>;
}

export type HistoryAffected =
  HistoryWorldAffected |
  HistoryOrganizeAffected |
  HistoryWhoAffected |
  HistoryPlaceAffected |
  HistoryItemAffected;

/**
 * 创建一个新的 World 影响记录
 */
export function createHistoryWorldAffected(data: {
  worldId: World['id'];
  data: Partial<Omit<World, 'id'>>;
}): HistoryWorldAffected {
  return {
    id: ulid(),
    entityType: 'world',
    entityId: data.worldId,
    data: data.data,
  };
}

/**
 * 创建一个新的 Organize 影响记录
 */
export function createHistoryOrganizeAffected(data: {
  organizeId: Organize['id'];
  data: Partial<Omit<Organize, 'id'>>;
}): HistoryOrganizeAffected {
  return {
    id: ulid(),
    entityType: 'organize',
    entityId: data.organizeId,
    data: data.data,
  };
}

/**
 * 创建一个新的 Who 影响记录
 */
export function createHistoryWhoAffected(data: {
  whoId: Who['id'];
  data: Partial<Omit<Who, 'id'>>;
}): HistoryWhoAffected {
  return {
    id: ulid(),
    entityType: 'who',
    entityId: data.whoId,
    data: data.data,
  };
}



/**
 * 创建一个新的 Place 影响记录
 */
export function createHistoryPlaceAffected(data: {
  placeId: Place['id'];
  data: Partial<Omit<Place, 'id'>>;
}): HistoryPlaceAffected {
  return {
    id: ulid(),
    entityType: 'place',
    entityId: data.placeId,
    data: data.data,
  };
}

/**
 * 创建一个新的 Item 影响记录
 */
export function createHistoryItemAffected(data: {
  itemId: Item['id'];
  data: Partial<Omit<Item, 'id'>>;
}): HistoryItemAffected {
  return {
    id: ulid(),
    entityType: 'item',
    entityId: data.itemId,
    data: data.data,
  };
}

/**
 * 从对象创建 HistoryAffected 数据
 */
export function fromHistoryAffected(data: Record<string, any>): HistoryAffected {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryAffected: id is required and must be a string');
  }
  if (!data.entityType || typeof data.entityType !== 'string') {
    throw new Error('Invalid HistoryAffected: entityType is required and must be a string');
  }
  if (!data.entityId || typeof data.entityId !== 'string') {
    throw new Error('Invalid HistoryAffected: entityId is required and must be a string');
  }
  if (!data.data || typeof data.data !== 'object') {
    throw new Error('Invalid HistoryAffected: data is required and must be an object');
  }

  const base = {
    id: data.id,
    entityType: data.entityType,
    entityId: data.entityId,
  };

  // 根据entityType创建对应的HistoryAffected
  switch (data.entityType) {
    case 'world':
      return {
        ...base,
        entityType: 'world',
        data: data.data,
      } as HistoryWorldAffected;
    case 'organize':
      return {
        ...base,
        entityType: 'organize',
        data: data.data,
      } as HistoryOrganizeAffected;
    case 'who':
      return {
        ...base,
        entityType: 'who',
        data: data.data,
      } as HistoryWhoAffected;
    case 'place':
      return {
        ...base,
        entityType: 'place',
        data: data.data,
      } as HistoryPlaceAffected;
    case 'item':
      return {
        ...base,
        entityType: 'item',
        data: data.data,
      } as HistoryItemAffected;
    default:
      throw new Error(`Invalid HistoryAffected: unknown entityType "${data.entityType}"`);
  }
}
