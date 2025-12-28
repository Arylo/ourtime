import { match, P } from 'ts-pattern';
import type { Calendar } from './Calendar';

export type ApproxType = 'year' | 'month' | 'day';

/**
 * StoryDate - 表示故事中的一个日期
*/
export interface StoryDate {
  calendarId?: Calendar['id'];
  rangeStart?: number;
  rangeEnd?: number;
  approx?: boolean | ApproxType;
  isUnknown?: boolean;
}

export interface UnknownStoryDate extends StoryDate {
  isUnknown: true;
  calendarId: undefined;
  rangeStart: undefined;
  rangeEnd: undefined;
  approx: undefined;
}
export interface ApproxStoryDate extends StoryDate {
  calendarId: Calendar['id'];
  rangeStart: number;
  rangeEnd: number;
  approx: true | ApproxType;
  isUnknown?: false;
}

export interface ExactStoryDate extends StoryDate {
  calendarId: Calendar['id'];
  rangeStart: number;
  rangeEnd: number;
  approx?: false;
  isUnknown?: false;
}

/**
 * 创建一个新的 StoryDate 对象
 */
export function createStoryDate(data: StoryDate) {
  return match(data)
    .with({ isUnknown: true }, (d) => ({
      isUnknown: true,
    }) as UnknownStoryDate)
    .with({ rangeStart: P.number, rangeEnd: P.number, approx: P.union('year', 'month', 'day', true) }, (d) => ({
      calendarId: d.calendarId!,
      rangeStart: d.rangeStart,
      rangeEnd: d.rangeEnd,
      approx: d.approx,
    }) as ApproxStoryDate)
    .with({ rangeStart: P.number, rangeEnd: P.number }, (d) => ({
      calendarId: d.calendarId!,
      rangeStart: d.rangeStart,
      rangeEnd: d.rangeEnd,
      approx: false,
    }) as ExactStoryDate)
    .otherwise(() => {
      throw new Error('Invalid StoryDate data');
    })
}

/**
 * 从对象创建 StoryDate 数据
 */
export function fromStoryDate(data: Record<string, any>) {
  // 如果标记为未知日期
  if (data.isUnknown === true) {
    return {
      isUnknown: true,
    } as UnknownStoryDate;
  }

  // 否则必须有日历信息
  if (typeof data.rangeStart !== 'number' || typeof data.rangeEnd !== 'number') {
    throw new Error('Invalid StoryDate: rangeStart and rangeEnd are required and must be numbers');
  }
  if (!data.calendarId || typeof data.calendarId !== 'string') {
    throw new Error('Invalid StoryDate: calendarId is required and must be a string');
  }

  // 处理 approx 参数
  const approx = data.approx;
  if (approx === 'year' || approx === 'month' || approx === 'day' || approx === true) {
    return {
      calendarId: data.calendarId,
      rangeStart: data.rangeStart,
      rangeEnd: data.rangeEnd,
      approx: approx,
    } as ApproxStoryDate;
  }

  return {
    calendarId: data.calendarId,
    rangeStart: data.rangeStart,
    rangeEnd: data.rangeEnd,
    approx: false,
  } as ExactStoryDate;
}
