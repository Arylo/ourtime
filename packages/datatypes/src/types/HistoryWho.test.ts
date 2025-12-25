import { describe, it, expect } from 'vitest';
import { createHistoryWho, fromHistoryWho, HistoryWhoRole } from './HistoryWho';

describe('HistoryWho', () => {
  describe('createHistoryWho', () => {
    it('应该创建一个带有ULID的HistoryWho对象', () => {
      const eventWho = createHistoryWho({
        historyId: 'history_1',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      });

      expect(eventWho).toBeDefined();
      expect(eventWho.id).toBeDefined();
      expect(eventWho.role).toBe(HistoryWhoRole.PARTICIPANT);
    });
  });

  describe('fromHistoryWho', () => {
    it('应该从对象创建HistoryWho对象', () => {
      const eventWhoData = {
        id: 'ew_123',
        historyId: 'history_1',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      };

      const eventWho = fromHistoryWho(eventWhoData);
      expect(eventWho.role).toBe(HistoryWhoRole.PARTICIPANT);
    });
  });
});
