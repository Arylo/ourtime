import { describe, it, expect } from 'vitest';
import { createStoryDate, fromStoryDate } from './StoryDate';

describe('StoryDate', () => {
  describe('createStoryDate', () => {
    it('应该创建一个带有日历信息的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        rangeStart: 1000,
        rangeEnd: 1000,
        calendarId: 'calendar_123',
      });

      expect(storyDate).toBeDefined();
      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(1000);
        expect(storyDate.rangeEnd).toBe(1000);
        expect(storyDate.calendarId).toBe('calendar_123');
        expect(storyDate.approx).toBe(false);
      }
    });

    it('应该创建一个带有近似值的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        rangeStart: 900,
        rangeEnd: 1100,
        calendarId: 'gregorian_calendar',
        approx: true,
      });

      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(900);
        expect(storyDate.rangeEnd).toBe(1100);
        expect(storyDate.calendarId).toBe('gregorian_calendar');
        expect(storyDate.approx).toBe(true);
      }
    });

    it('应该创建一个未知日期的 StoryDate 对象', () => {
      const storyDate = createStoryDate({
        isUnknown: true,
      });

      if ('isUnknown' in storyDate) {
        expect(storyDate.isUnknown).toBe(true);
      }
    });
  });

  describe('fromStoryDate', () => {
    it('应该从对象创建带有日历信息的 StoryDate', () => {
      const data = {
        rangeStart: 1000,
        rangeEnd: 1200,
        calendarId: 'calendar_he',
        approx: false,
      };
      const storyDate = fromStoryDate(data);
      if ('rangeStart' in storyDate) {
        expect(storyDate.rangeStart).toBe(1000);
        expect(storyDate.rangeEnd).toBe(1200);
        expect(storyDate.calendarId).toBe('calendar_he');
        expect(storyDate.approx).toBe(false);
      }
    });

    it('应该从对象创建未知日期的 StoryDate', () => {
      const data = {
        isUnknown: true,
      };
      const storyDate = fromStoryDate(data);
      if ('isUnknown' in storyDate) {
        expect(storyDate.isUnknown).toBe(true);
      }
    });

    it('缺少必要字段时应该抛出错误', () => {
      expect(() => fromStoryDate({})).toThrow();
      expect(() => fromStoryDate({ rangeStart: 1, rangeEnd: 2 })).toThrow();
      expect(() => fromStoryDate({ rangeStart: 1, rangeEnd: 2 })).toThrow('Invalid StoryDate: calendarId is required and must be a string');
    });

    it('当不是未知日期时缺少 rangeStart/rangeEnd 应该抛出错误', () => {
      expect(() => fromStoryDate({})).toThrow('Invalid StoryDate: rangeStart and rangeEnd are required and must be numbers');
    });
  });

  describe('边界测试', () => {
    it('应该处理 rangeStart 和 rangeEnd 的极端值', () => {
      const extremeStoryDate = createStoryDate({

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

        calendarId: 'calendar_year',
        rangeStart: 1000,
        rangeEnd: 1000,
        approx: 'year',
      });

      expect(storyDate.approx).toBe('year');
      expect(storyDate.calendarId).toBe('calendar_year');
      expect(storyDate.rangeStart).toBe(1000);
      expect(storyDate.rangeEnd).toBe(1000);
    });

    it('应该正确处理 month 类型的 approx', () => {
      const storyDate = createStoryDate({

        calendarId: 'calendar_month',
        rangeStart: 2000,
        rangeEnd: 2000,
        approx: 'month',
      });

      expect(storyDate.approx).toBe('month');
      expect(storyDate.calendarId).toBe('calendar_month');
      expect(storyDate.rangeStart).toBe(2000);
      expect(storyDate.rangeEnd).toBe(2000);
    });

    it('应该正确处理 day 类型的 approx', () => {
      const storyDate = createStoryDate({

        calendarId: 'calendar_day',
        rangeStart: 3000,
        rangeEnd: 3000,
        approx: 'day',
      });

      expect(storyDate.approx).toBe('day');
      expect(storyDate.calendarId).toBe('calendar_day');
      expect(storyDate.rangeStart).toBe(3000);
      expect(storyDate.rangeEnd).toBe(3000);
    });
  });
});
