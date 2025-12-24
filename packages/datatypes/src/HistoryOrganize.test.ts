import { describe, it, expect } from 'vitest';
import { createHistoryOrganize, fromHistoryOrganize, HistoryOrganizeRole } from './HistoryOrganize';

describe('HistoryOrganize', () => {
  describe('createHistoryOrganize', () => {
    it('应该创建一个带有ULID的HistoryOrganize对象', () => {
      const eventOrganize = createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      });

      expect(eventOrganize).toBeDefined();
      expect(eventOrganize.id).toBeDefined();
      expect(eventOrganize.role).toBe(HistoryOrganizeRole.PARTICIPANT);
    });
  });

  describe('fromHistoryOrganize', () => {
    it('应该从对象创建HistoryOrganize对象', () => {
      const eventOrganizeData = {
        id: 'eo_123',
        historyId: 'history_1',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      };

      const eventOrganize = fromHistoryOrganize(eventOrganizeData);
      expect(eventOrganize.role).toBe(HistoryOrganizeRole.PARTICIPANT);
    });
  });
});
