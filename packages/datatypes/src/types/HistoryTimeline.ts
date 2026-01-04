import { ulid } from 'ulid';
import type { History } from './History';
import type { Timeline } from './Timeline';
import { StoryDate, fromStoryDate } from './StoryDate';

/**
 * HistoryTimelineRole - 事件与时间轴关系的角色枚举
 */
export enum HistoryTimelineRole {
  OCCURRED_IN = 'occurred_in',
}

/**
 * HistoryTimelineKey - 事件与时间轴关系的键
 */
export type HistoryTimelineKey = 'role' | 'startAt' | 'endAt';

/**
 * HistoryTimelineValue - 事件与时间轴关系的值
 */
export type HistoryTimelineValue = HistoryTimelineRole | StoryDate;

/**
 * HistoryTimeline - 表示事件与时间轴之间的关系
 */
export interface HistoryTimeline {
  id: string;
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: HistoryTimelineKey;
  value: HistoryTimelineValue;
}

/**
 * 创建一个新的 HistoryTimeline 对象
 */
export function createHistoryTimeline(data: {
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: 'startAt' | 'endAt';
  value: StoryDate;
}): HistoryTimeline;
export function createHistoryTimeline(data: {
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: 'role';
  value: HistoryTimelineRole;
}): HistoryTimeline;
export function createHistoryTimeline(data: {
  historyId: History['id'];
  timelineId: Timeline['id'];
  key: HistoryTimelineKey;
  value: HistoryTimelineValue;
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
  let value = data.value;

  if (key === 'startAt' || key === 'endAt') {
    value = fromStoryDate(data.value);
  }

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
  if (!data.key || !['role', 'startAt', 'endAt'].includes(data.key)) {
    throw new Error('Invalid HistoryTimeline: key is required and must be role, startAt or endAt');
  }
  if (data.key === 'role') {
    if (!data.value || !Object.values(HistoryTimelineRole).includes(data.value as HistoryTimelineRole)) {
      throw new Error('Invalid HistoryTimeline: value must be a valid HistoryTimelineRole when key is role');
    }
  } else if (data.key === 'startAt' || data.key === 'endAt') {
    if (!data.value || typeof data.value !== 'object') {
      throw new Error(`Invalid HistoryTimeline: value must be a StoryDate when key is ${data.key}`);
    }
  }
  return true;
}
