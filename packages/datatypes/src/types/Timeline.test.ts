import { describe, it, expect } from 'vitest';
import { createTimeline, fromTimeline, type Timeline } from './Timeline';
import { createStoryDate } from './StoryDate';

describe('Timeline', () => {
  describe('createTimeline', () => {
    it('应该创建一个带有ULID的Timeline对象', () => {
      const timeline = createTimeline({
        name: '测试时间线',
      });

      expect(timeline).toBeDefined();
      expect(timeline.id).toBeDefined();
      expect(timeline.id.length).toBeGreaterThan(0);
      expect(timeline.name).toBe('测试时间线');
      expect(timeline.baseOn).toBeUndefined();
      expect(timeline.baseAt).toBeUndefined();
    });

    it('应该创建一个带有baseOn和baseAt的Timeline对象', () => {
      const baseAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const timeline = createTimeline({
        name: '子时间线',
        baseOn: 'parent_timeline_123',
        baseAt,
      });

      expect(timeline).toBeDefined();
      expect(timeline.id).toBeDefined();
      expect(timeline.id.length).toBeGreaterThan(0);
      expect(timeline.name).toBe('子时间线');
      expect(timeline.baseOn).toBe('parent_timeline_123');
      expect(timeline.baseAt).toBe(baseAt);
    });

    it('当只提供baseOn时应该抛出错误', () => {
      expect(() => createTimeline({
        name: '测试时间线',
        baseOn: 'parent_timeline_123',
      })).toThrow('Invalid Timeline: baseAt is required when baseOn is provided');
    });

    it('当只提供baseAt时应该抛出错误', () => {
      const baseAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      expect(() => createTimeline({
        name: '测试时间线',
        baseAt,
      })).toThrow('Invalid Timeline: baseOn is required when baseAt is provided');
    });

    it('每次创建的Timeline应该有唯一的ID', () => {
      const timeline1 = createTimeline({ name: '时间线1' });
      const timeline2 = createTimeline({ name: '时间线2' });

      expect(timeline1.id).not.toBe(timeline2.id);
    });

    it('应该支持设置时间流速', () => {
      const timeline = createTimeline({
        name: '精神时间屋',
        speed: 0.1,
      });
      expect(timeline.speed).toBe(0.1);
    });

    it('默认时间流速应该为1.0', () => {
      const timeline = createTimeline({ name: '普通时间线' });
      expect(timeline.speed).toBe(1.0);
    });
  });

  describe('fromTimeline', () => {
    it('应该从对象创建Timeline对象', () => {
      const timelineData = {
        id: 'timeline_123',
        name: '测试时间线',
      };

      const timeline = fromTimeline(timelineData);

      expect(timeline).toBeDefined();
      expect(timeline.id).toBe('timeline_123');
      expect(timeline.name).toBe('测试时间线');
      expect(timeline.baseOn).toBeUndefined();
      expect(timeline.baseAt).toBeUndefined();
    });

    it('应该从带有baseOn和baseAt的对象创建Timeline对象', () => {
      const baseAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const timelineData = {
        id: 'timeline_123',
        name: '子时间线',
        baseOn: 'parent_timeline_123',
        baseAt,
      };

      const timeline = fromTimeline(timelineData);

      expect(timeline).toBeDefined();
      expect(timeline.id).toBe('timeline_123');
      expect(timeline.name).toBe('子时间线');
      expect(timeline.baseOn).toBe('parent_timeline_123');
      expect(timeline.baseAt).toEqual(baseAt);
    });

    it('当只提供baseOn时应该抛出错误', () => {
      const timelineData = {
        id: 'timeline_123',
        name: '测试时间线',
        baseOn: 'parent_timeline_123',
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: baseAt is required when baseOn is provided');
    });

    it('当只提供baseAt时应该抛出错误', () => {
      const timelineData = {
        id: 'timeline_123',
        name: '测试时间线',
        baseAt: '2024-01-01T00:00:00.000Z',
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: baseOn is required when baseAt is provided');
    });

    it('当缺少id时应该抛出错误', () => {
      const timelineData = {
        name: '测试时间线',
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const timelineData = {
        id: 'timeline_123',
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: name is required and must be a string');
    });

    it('当id不是字符串时应该抛出错误', () => {
      const timelineData = {
        id: 123,
        name: '测试时间线',
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: id is required and must be a string');
    });

    it('当name不是字符串时应该抛出错误', () => {
      const timelineData = {
        id: 'timeline_123',
        name: 123,
      };

      expect(() => fromTimeline(timelineData)).toThrow('Invalid Timeline: name is required and must be a string');
    });
  });

  describe('Timeline接口', () => {
    it('应该符合Timeline接口定义', () => {
      const timeline: Timeline = {
        id: 'timeline_123',
        name: '测试时间线',
      };

      expect(timeline.id).toBe('timeline_123');
      expect(timeline.name).toBe('测试时间线');
      expect(timeline.baseOn).toBeUndefined();
      expect(timeline.baseAt).toBeUndefined();
    });

    it('应该符合带有baseOn和baseAt的Timeline接口定义', () => {
      const baseAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const timeline: Timeline = {
        id: 'timeline_123',
        name: '子时间线',
        baseOn: 'parent_timeline_123',
        baseAt,
      };

      expect(timeline.id).toBe('timeline_123');
      expect(timeline.name).toBe('子时间线');
      expect(timeline.baseOn).toBe('parent_timeline_123');
      expect(timeline.baseAt).toBe(baseAt);
    });
  });
});
