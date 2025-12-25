import { describe, it, expect } from 'vitest';
import { createHistoryPlace, fromHistoryPlace, HistoryPlaceRole } from './HistoryPlace';

describe('HistoryPlace', () => {
  describe('createHistoryPlace', () => {
    it('应该创建一个带有ULID的HistoryPlace对象', () => {
      const eventPlace = createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      });

      expect(eventPlace).toBeDefined();
      expect(eventPlace.id).toBeDefined();
      expect(eventPlace.role).toBe(HistoryPlaceRole.OCCURRED_IN);
    });
  });

  describe('fromHistoryPlace', () => {
    it('应该从对象创建HistoryPlace对象', () => {
      const eventPlaceData = {
        id: 'ep_123',
        historyId: 'history_1',
        placeId: 'place_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      };

      const eventPlace = fromHistoryPlace(eventPlaceData);
      expect(eventPlace.role).toBe(HistoryPlaceRole.OCCURRED_IN);
    });
  });
});
