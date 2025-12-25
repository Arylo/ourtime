import { describe, it, expect } from 'vitest';
import { createStoryDate, fromStoryDate } from './StoryDate';

describe('StoryDate', () => {
  describe('createStoryDate', () => {
    it('应该创建一个带有日历信息的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_123',
        rangeStart: 1000,
        rangeEnd: 1000,
        calendarId: 'calendar_123',
      });

      expect(storyDate).toBeDefined();
      expect(storyDate.id).toBeDefined();
      expect(storyDate.timelineId).toBe('timeline_123');
      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(1000);
        expect(storyDate.rangeEnd).toBe(1000);
        expect(storyDate.calendarId).toBe('calendar_123');
        expect(storyDate.approx).toBe(false);
      }
    });

    it('应该创建一个带有近似值的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_123',
        rangeStart: 900,
        rangeEnd: 1100,
        calendarId: 'gregorian_calendar',
        approx: true,
      });

      expect(storyDate.timelineId).toBe('timeline_123');
      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(900);
        expect(storyDate.rangeEnd).toBe(1100);
        expect(storyDate.calendarId).toBe('gregorian_calendar');
        expect(storyDate.approx).toBe(true);
      }
    });

    it('应该创建一个未知日期的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_123',
        isUnknown: true,
      });

      expect(storyDate.timelineId).toBe('timeline_123');
      expect(storyDate.id).toBeDefined();
      if ('isUnknown' in storyDate) {
        expect(storyDate.isUnknown).toBe(true);
      }
    });
  });

  describe('fromStoryDate', () => {
    it('应该从对象创建带有日历信息的 StoryDate', () => {
      const data = {
        id: 'test-id',
        timelineId: 'timeline_123',
        rangeStart: 1000,
        rangeEnd: 1200,
        calendarId: 'calendar_he',
        approx: false,
      };
      const storyDate = fromStoryDate(data);
      expect(storyDate.id).toBe('test-id');
      expect(storyDate.timelineId).toBe('timeline_123');
      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(1000);
        expect(storyDate.rangeEnd).toBe(1200);
        expect(storyDate.calendarId).toBe('calendar_he');
        expect(storyDate.approx).toBe(false);
      }
    });

    it('应该从对象创建未知日期的 StoryDate', () => {
      const data = {
        id: 'test-id-2',
        timelineId: 'timeline_456',
        isUnknown: true,
      };
      const storyDate = fromStoryDate(data);
      expect(storyDate.id).toBe('test-id-2');
      expect(storyDate.timelineId).toBe('timeline_456');
      if ('isUnknown' in storyDate) {
        expect(storyDate.isUnknown).toBe(true);
      }
    });

    it('缺少必要字段时应该抛出错误', () => {
      expect(() => fromStoryDate({ id: '1' })).toThrow();
      expect(() => fromStoryDate({ rangeStart: 1, rangeEnd: 2 })).toThrow();
      expect(() => fromStoryDate({ id: '1', rangeStart: 1, rangeEnd: 2 })).toThrow('Invalid StoryDate: timelineId is required and must be a string');
      expect(() => fromStoryDate({ id: '1', timelineId: 'timeline_123', rangeStart: 1, rangeEnd: 2 })).toThrow('Invalid StoryDate: calendarId is required and must be a string');
    });

    it('当不是未知日期时缺少 rangeStart/rangeEnd 应该抛出错误', () => {
      expect(() => fromStoryDate({ id: '1', timelineId: 'timeline_123' })).toThrow('Invalid StoryDate: rangeStart and rangeEnd are required and must be numbers');
    });
  });

  describe('边界测试', () => {
    it('应该处理 rangeStart 和 rangeEnd 的极端值', () => {
      const extremeStoryDate = createStoryDate({
        timelineId: 'timeline_extreme',
        rangeStart: Number.MIN_SAFE_INTEGER,
        rangeEnd: Number.MAX_SAFE_INTEGER,
        calendarId: 'extreme_calendar',
      });

      expect(extremeStoryDate.rangeStart).toBe(Number.MIN_SAFE_INTEGER);
      expect(extremeStoryDate.rangeEnd).toBe(Number.MAX_SAFE_INTEGER);
      expect(extremeStoryDate.calendarId).toBe('extreme_calendar');
    });

    it('应该处理负数范围', () => {
      const negativeStoryDate = createStoryDate({
        timelineId: 'timeline_negative',
        rangeStart: -100,
        rangeEnd: -50,
        calendarId: 'negative_calendar',
      });

      expect(negativeStoryDate.rangeStart).toBe(-100);
      expect(negativeStoryDate.rangeEnd).toBe(-50);
      expect(negativeStoryDate.calendarId).toBe('negative_calendar');
    });
  });

  describe('ApproxType 测试', () => {
    it('应该正确处理 year 类型的 approx', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_year',
        calendarId: 'calendar_year',
        approx: 'year',
      });

      expect(storyDate.approx).toBe('year');
      expect(storyDate.calendarId).toBe('calendar_year');
    });

    it('应该正确处理 month 类型的 approx', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_month',
        calendarId: 'calendar_month',
        approx: 'month',
      });

      expect(storyDate.approx).toBe('month');
      expect(storyDate.calendarId).toBe('calendar_month');
    });

    it('应该正确处理 day 类型的 approx', () => {
      const storyDate = createStoryDate({
        timelineId: 'timeline_day',
        calendarId: 'calendar_day',
        approx: 'day',
      });

      expect(storyDate.approx).toBe('day');
      expect(storyDate.calendarId).toBe('calendar_day');
    });
  });
});
