import { describe, it, expect } from 'vitest';
import { createItemPlace, fromItemPlace, ItemPlaceRole } from './ItemPlace';

describe('ItemPlace', () => {
  describe('createItemPlace', () => {
    it('应该创建一个带有ULID的ItemPlace对象', () => {
      const itemPlace = createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        role: ItemPlaceRole.OWNER,
      });

      expect(itemPlace).toBeDefined();
      expect(itemPlace.id).toBeDefined();
      expect(itemPlace.role).toBe(ItemPlaceRole.OWNER);
    });
  });

  describe('fromItemPlace', () => {
    it('应该从对象创建ItemPlace对象', () => {
      const itemPlaceData = {
        id: 'ip_123',
        itemId: 'item_1',
        placeId: 'place_1',
        role: ItemPlaceRole.CREATOR,
      };

      const itemPlace = fromItemPlace(itemPlaceData);
      expect(itemPlace.role).toBe(ItemPlaceRole.CREATOR);
    });
  });
});
