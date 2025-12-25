import type { History } from './History';
import { StoryDate, fromStoryDate } from './StoryDate';

/**
 * History 间的前后关系类型
 * 对应分类：相同、前、后、前StoryDate、后StoryDate
 */
export enum HistoryRelationType {
  /** 相同 */
  SAME = 'SAME',
  /** 前（from 在 to 之前） */
  BEFORE = 'BEFORE',
  /** 后（from 在 to 之后） */
  AFTER = 'AFTER',
}

export interface HistoryRelation {
  fromHistoryId: History['id'];
  toHistoryId: History['id'];
  type: HistoryRelationType;
  value?: StoryDate;
}

export function createHistoryRelation(data: {
  fromHistoryId: History['id'];
  toHistoryId: History['id'];
  type: HistoryRelationType;
  value?: StoryDate;
}): HistoryRelation {
  return {
    fromHistoryId: data.fromHistoryId,
    toHistoryId: data.toHistoryId,
    type: data.type,
    value: data.value,
  };
}

export function fromHistoryRelation(data: Record<string, any>): HistoryRelation {
  if (!data.fromHistoryId || typeof data.fromHistoryId !== 'string') {
    throw new Error('Invalid HistoryRelation: fromHistoryId is required and must be a string');
  }
  if (!data.toHistoryId || typeof data.toHistoryId !== 'string') {
    throw new Error('Invalid HistoryRelation: toHistoryId is required and must be a string');
  }
  if (!data.type || !Object.values(HistoryRelationType).includes(data.type as HistoryRelationType)) {
    throw new Error('Invalid HistoryRelation: type is required and must be a valid HistoryRelationType');
  }

  return {
    fromHistoryId: data.fromHistoryId,
    toHistoryId: data.toHistoryId,
    type: data.type as HistoryRelationType,
    value: data.value ? fromStoryDate(data.value) : undefined,
  };
}
