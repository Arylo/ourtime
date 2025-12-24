import { describe, it, expect } from 'vitest';
import { createHistoryWorld, fromHistoryWorld, HistoryWorldRole } from './HistoryWorld';

describe('HistoryWorld', () => {
  describe('createHistoryWorld', () => {
    it('应该创建一个带有ULID的HistoryWorld对象', () => {
      const eventWorld = createHistoryWorld({
        historyId: 'history_1',
        worldId: 'world_1',
        role: HistoryWorldRole.OCCURRED_IN,
      });

      expect(eventWorld).toBeDefined();
      expect(eventWorld.id).toBeDefined();
      expect(eventWorld.role).toBe(HistoryWorldRole.OCCURRED_IN);
    });
  });

  describe('fromHistoryWorld', () => {
    it('应该从对象创建HistoryWorld对象', () => {
      const eventWorldData = {
        id: 'ew_123',
        historyId: 'history_1',
        worldId: 'world_1',
        role: HistoryWorldRole.OCCURRED_IN,
      };

      const eventWorld = fromHistoryWorld(eventWorldData);
      expect(eventWorld.role).toBe(HistoryWorldRole.OCCURRED_IN);
    });
  });
});
