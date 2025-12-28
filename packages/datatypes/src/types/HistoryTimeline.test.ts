import { describe, it, expect } from 'vitest';
import { createHistoryTimeline, fromHistoryTimeline, HistoryTimelineRole } from './HistoryTimeline';

describe('HistoryTimeline', () => {
  describe('createHistoryTimeline', () => {
    it('应该创建一个带有ULID的HistoryTimeline对象', () => {
      const eventTimeline = createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      });

      expect(eventTimeline).toBeDefined();
      expect(eventTimeline.id).toBeDefined();
      expect(eventTimeline.role).toBe(HistoryTimelineRole.OCCURRED_IN);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        timelineId: 'timeline_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryTimeline: historyId is required and must be a string');
    });

    it('当缺少timelineId时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryTimeline: timelineId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
      } as any)).toThrow('Invalid HistoryTimeline: role is required and must be a valid HistoryTimelineRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid HistoryTimeline: role is required and must be a valid HistoryTimelineRole');
    });
  });

  describe('fromHistoryTimeline', () => {
    it('应该从对象创建HistoryTimeline对象', () => {
      const eventTimelineData = {
        id: 'et_123',
        historyId: 'history_1',
        timelineId: 'timeline_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      };

      const eventTimeline = fromHistoryTimeline(eventTimelineData);
      expect(eventTimeline.role).toBe(HistoryTimelineRole.OCCURRED_IN);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        historyId: 'history_1',
        timelineId: 'timeline_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryTimeline: id is required and must be a string');
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        id: 'et_123',
        timelineId: 'timeline_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryTimeline: historyId is required and must be a string');
    });

    it('当缺少timelineId时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        id: 'et_123',
        historyId: 'history_1',
        role: HistoryTimelineRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryTimeline: timelineId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        id: 'et_123',
        historyId: 'history_1',
        timelineId: 'timeline_1',
      })).toThrow('Invalid HistoryTimeline: role is required and must be a valid HistoryTimelineRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromHistoryTimeline({
        id: 'et_123',
        historyId: 'history_1',
        timelineId: 'timeline_1',
        role: 'invalid_role',
      })).toThrow('Invalid HistoryTimeline: role is required and must be a valid HistoryTimelineRole');
    });
  });
});
