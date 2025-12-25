import { describe, it, expect } from 'vitest';
import { createWorldPlace, fromWorldPlace } from './WorldPlace';

describe('WorldPlace', () => {
  describe('createWorldPlace', () => {
    it('应该创建一个带有ULID的WorldPlace对象', () => {
      const worldPlace = createWorldPlace({
        worldId: 'world_123',
        placeId: 'place_123',
      });

      expect(worldPlace).toBeDefined();
      expect(worldPlace.id).toBeDefined();
      expect(worldPlace.id.length).toBeGreaterThan(0);
      expect(worldPlace.worldId).toBe('world_123');
      expect(worldPlace.placeId).toBe('place_123');
    });
  });

  describe('fromWorldPlace', () => {
    it('应该从对象创建WorldPlace对象', () => {
      const worldPlaceData = {
        id: 'wp_123',
        worldId: 'world_123',
        placeId: 'place_123',
      };

      const worldPlace = fromWorldPlace(worldPlaceData);

      expect(worldPlace).toBeDefined();
      expect(worldPlace.id).toBe('wp_123');
      expect(worldPlace.worldId).toBe('world_123');
      expect(worldPlace.placeId).toBe('place_123');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromWorldPlace({ id: '1' })).toThrow('Invalid WorldPlace: worldId is required');
      expect(() => fromWorldPlace({ id: '1', worldId: 'w1' })).toThrow('Invalid WorldPlace: placeId is required');
      expect(() => fromWorldPlace({ worldId: 'w1', placeId: 'p1' })).toThrow('Invalid WorldPlace: id is required');
    });
  });
});
