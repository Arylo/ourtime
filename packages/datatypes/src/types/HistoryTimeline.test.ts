import { describe, it, expect } from 'vitest';
import { createHistoryTimeline, fromHistoryTimeline, HistoryTimelineRole } from './HistoryTimeline';
import { createStoryDate } from './StoryDate';

describe('HistoryTimeline', () => {
  describe('createHistoryTimeline', () => {
    it('应该创建一个带有ULID的HistoryTimeline对象', () => {
      const eventTimeline = createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'role',
        value: HistoryTimelineRole.OCCURRED_IN,
      });

      expect(eventTimeline).toBeDefined();
      expect(eventTimeline.id).toBeDefined();
      expect(eventTimeline.key).toBe('role');
      expect(eventTimeline.value).toBe(HistoryTimelineRole.OCCURRED_IN);
    });

    it('应该创建带有startAt的HistoryTimeline对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const eventTimeline = createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'startAt',
        value: startAt,
      });

      expect(eventTimeline.key).toBe('startAt');
      expect(eventTimeline.value).toEqual(startAt);
    });

    it('应该创建带有endAt的HistoryTimeline对象', () => {
      const endAt = createStoryDate({ rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const eventTimeline = createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'endAt',
        value: endAt,
      });

      expect(eventTimeline.key).toBe('endAt');
      expect(eventTimeline.value).toEqual(endAt);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        timelineId: 'timeline_1',
        key: 'role',
        value: HistoryTimelineRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryTimeline: historyId is required and must be a string');
    });

    it('当缺少timelineId时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        key: 'role',
        value: HistoryTimelineRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryTimeline: timelineId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        value: HistoryTimelineRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryTimeline: key is required and must be role, startAt or endAt');
    });

    it('当value无效时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'role',
        value: 'invalid_role' as any,
      } as any)).toThrow('Invalid HistoryTimeline: value must be a valid HistoryTimelineRole when key is role');
    });
  });

  describe('fromHistoryTimeline', () => {
    it('应该从对象创建HistoryTimeline对象', () => {
      const eventTimelineData = {
        id: 'et_123',
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'role',
        value: HistoryTimelineRole.OCCURRED_IN,
      };

      const eventTimeline = fromHistoryTimeline(eventTimelineData);
      expect(eventTimeline.key).toBe('role');
      expect(eventTimeline.value).toBe(HistoryTimelineRole.OCCURRED_IN);
    });

    it('应该从带有startAt的对象创建HistoryTimeline对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const eventTimelineData = {
        id: 'et_123',
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'startAt',
        value: startAt,
      };

      const eventTimeline = fromHistoryTimeline(eventTimelineData);
      expect(eventTimeline.key).toBe('startAt');
      expect(eventTimeline.value).toEqual(startAt);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        key: 'role',
        value: HistoryTimelineRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryTimeline: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({ id: '1' })).toThrow('Invalid HistoryTimeline: historyId is required and must be a string');
      expect(() => fromHistoryTimeline({ id: '1', historyId: 'h1' })).toThrow('Invalid HistoryTimeline: timelineId is required and must be a string');
      expect(() => fromHistoryTimeline({ id: '1', historyId: 'h1', timelineId: 't1' })).toThrow('Invalid HistoryTimeline: key is required and must be role, startAt or endAt');
    });
  });
});
