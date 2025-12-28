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

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        placeId: 'place_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryPlace: historyId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryPlace: placeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
      } as any)).toThrow('Invalid HistoryPlace: role is required and must be a valid HistoryPlaceRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid HistoryPlace: role is required and must be a valid HistoryPlaceRole');
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

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryPlace: id is required and must be a string');
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        id: 'ep_123',
        placeId: 'place_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryPlace: historyId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        id: 'ep_123',
        historyId: 'history_1',
        role: HistoryPlaceRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryPlace: placeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        id: 'ep_123',
        historyId: 'history_1',
        placeId: 'place_1',
      })).toThrow('Invalid HistoryPlace: role is required and must be a valid HistoryPlaceRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        id: 'ep_123',
        historyId: 'history_1',
        placeId: 'place_1',
        role: 'invalid_role',
      })).toThrow('Invalid HistoryPlace: role is required and must be a valid HistoryPlaceRole');
    });
  });
});
