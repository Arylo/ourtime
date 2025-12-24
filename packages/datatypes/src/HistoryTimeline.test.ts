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
  });
});
