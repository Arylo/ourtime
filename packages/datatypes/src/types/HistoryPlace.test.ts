import { describe, it, expect } from 'vitest';
import { createHistoryPlace, fromHistoryPlace, HistoryPlaceRole } from './HistoryPlace';

describe('HistoryPlace', () => {
  describe('createHistoryPlace', () => {
    it('应该创建一个带有ULID加key-value的HistoryPlace对象', () => {
      const eventPlace = createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        key: 'role',
        value: HistoryPlaceRole.OCCURRED_IN,
      });

      expect(eventPlace).toBeDefined();
      expect(eventPlace.id).toBeDefined();
      expect(eventPlace.key).toBe('role');
      expect(eventPlace.value).toBe(HistoryPlaceRole.OCCURRED_IN);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        placeId: 'place_1',
        key: 'role',
        value: HistoryPlaceRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryPlace: historyId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        key: 'role',
        value: HistoryPlaceRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryPlace: placeId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        value: HistoryPlaceRole.OCCURRED_IN,
      } as any)).toThrow('Invalid HistoryPlace: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid HistoryPlace: role value must be a valid HistoryPlaceRole');
    });
  });

  describe('fromHistoryPlace', () => {
    it('应该从对象创建HistoryPlace对象', () => {
      const eventPlaceData = {
        id: 'ep_123',
        historyId: 'history_1',
        placeId: 'place_1',
        key: 'role',
        value: HistoryPlaceRole.OCCURRED_IN,
      };

      const eventPlace = fromHistoryPlace(eventPlaceData);
      expect(eventPlace.key).toBe('role');
      expect(eventPlace.value).toBe(HistoryPlaceRole.OCCURRED_IN);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryPlace({
        historyId: 'history_1',
        placeId: 'place_1',
        key: 'role',
        value: HistoryPlaceRole.OCCURRED_IN,
      })).toThrow('Invalid HistoryPlace: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromHistoryPlace({ id: '1' })).toThrow('Invalid HistoryPlace: historyId is required and must be a string');
      expect(() => fromHistoryPlace({ id: '1', historyId: 'h1' })).toThrow('Invalid HistoryPlace: placeId is required and must be a string');
      expect(() => fromHistoryPlace({ id: '1', historyId: 'h1', placeId: 'p1' })).toThrow('Invalid HistoryPlace: key is required and must be role, startAt or endAt');
    });
  });
});
