import { ulid } from 'ulid';
import type { History } from './History';
import type { Timeline } from './Timeline';

/**
 * HistoryTimelineRole - 事件与时间轴关系的角色枚举
 */
export enum HistoryTimelineRole {
  OCCURRED_IN = 'occurred_in',
}

/**
 * HistoryTimelineKey - 事件与时间轴关系的键
 */
export type HistoryTimelineKey = 'role';

/**
 * HistoryTimeline - 表示事件与时间轴之间的关系
 */
export interface HistoryTimeline {
  id: string;
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: HistoryTimelineKey;
  value: HistoryTimelineRole;
}

/**
 * 创建一个新的 HistoryTimeline 对象
 */
export function createHistoryTimeline(data: {
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: HistoryTimelineKey;
  value: HistoryTimelineRole;
}): HistoryTimeline {
  validateHistoryTimeline(data);
  return {
    id: ulid(),
    historyId: data.historyId,
    timelineId: data.timelineId,
    key: data.key,
    value: data.value,
  };
}

/**
 * 从对象创建 HistoryTimeline 数据
 */
export function fromHistoryTimeline(data: Record<string, any>): HistoryTimeline {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid HistoryTimeline: id is required and must be a string');
  }

  const key = data.key as HistoryTimelineKey;
  const value = data.value as HistoryTimelineRole;

  const result = {
    id: data.id,
    historyId: data.historyId,
    timelineId: data.timelineId,
    key,
    value,
  };

  validateHistoryTimeline(result);

  return result;
}

function validateHistoryTimeline(data: Record<string, any>) {
  if (!data.historyId || typeof data.historyId !== 'string') {
    throw new Error('Invalid HistoryTimeline: historyId is required and must be a string');
  }
  if (!data.timelineId || typeof data.timelineId !== 'string') {
    throw new Error('Invalid HistoryTimeline: timelineId is required and must be a string');
  }
  if (!data.key || data.key !== 'role') {
    throw new Error('Invalid HistoryTimeline: key is required and must be role');
  }
  if (!data.value || !Object.values(HistoryTimelineRole).includes(data.value as HistoryTimelineRole)) {
    throw new Error('Invalid HistoryTimeline: value is required and must be a valid HistoryTimelineRole');
  }
  return true;
}
