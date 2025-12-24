import { ulid } from 'ulid';
import type { Timeline } from './Timeline';
import type { Calendar } from './Calendar';

/**
 * StoryDate - 表示故事中的一个日期
*/
export type StoryDate = {
  id: string;
  timelineId: Timeline['id'];
  calendarId?: Calendar['id'];
  rangeStart?: number;
  rangeEnd?: number;
  approx?: boolean;
  isUnknown?: true;
}

/**
 * 创建一个新的 StoryDate 对象
 */
export function createStoryDate(data: Omit<StoryDate, 'id'>): StoryDate {
  const id = ulid();
  // Unknown date: keep minimal fields
  if (data.isUnknown === true) {
    return {
      id,
      timelineId: data.timelineId,
      isUnknown: true,
    };
  }

  // Known date: ensure approx defaults to false when not provided
  return {
    id,
    timelineId: data.timelineId,
    calendarId: data.calendarId,
    rangeStart: data.rangeStart,
    rangeEnd: data.rangeEnd,
    approx: data.approx ?? false,
  };
}

/**
 * 从对象创建 StoryDate 数据
 */
export function fromStoryDate(data: Record<string, any>): StoryDate {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid StoryDate: id is required and must be a string');
  }
  if (!data.timelineId || typeof data.timelineId !== 'string') {
    throw new Error('Invalid StoryDate: timelineId is required and must be a string');
  }

  const base = {
    id: data.id,
    timelineId: data.timelineId,
  };

  // 如果标记为未知日期
  if (data.isUnknown === true) {
    return {
      ...base,
      isUnknown: true,
    };
  }

  // 否则必须有日历信息
  if (typeof data.rangeStart !== 'number' || typeof data.rangeEnd !== 'number') {
    throw new Error('Invalid StoryDate: rangeStart and rangeEnd are required and must be numbers');
  }
  if (!data.calendarId || typeof data.calendarId !== 'string') {
    throw new Error('Invalid StoryDate: calendarId is required and must be a string');
  }

  return {
    ...base,
    calendarId: data.calendarId,
    rangeStart: data.rangeStart,
    rangeEnd: data.rangeEnd,
    approx: !!data.approx,
  };
}
