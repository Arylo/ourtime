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

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemPlace({
        placeId: 'place_1',
        role: ItemPlaceRole.OWNER,
      } as any)).toThrow('Invalid ItemPlace: itemId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        role: ItemPlaceRole.OWNER,
      } as any)).toThrow('Invalid ItemPlace: placeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
      } as any)).toThrow('Invalid ItemPlace: role is required and must be a valid ItemPlaceRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid ItemPlace: role is required and must be a valid ItemPlaceRole');
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

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        role: ItemPlaceRole.CREATOR,
      })).toThrow('Invalid ItemPlace: id is required and must be a string');
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => fromItemPlace({
        id: 'ip_123',
        placeId: 'place_1',
        role: ItemPlaceRole.CREATOR,
      })).toThrow('Invalid ItemPlace: itemId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => fromItemPlace({
        id: 'ip_123',
        itemId: 'item_1',
        role: ItemPlaceRole.CREATOR,
      })).toThrow('Invalid ItemPlace: placeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromItemPlace({
        id: 'ip_123',
        itemId: 'item_1',
        placeId: 'place_1',
      })).toThrow('Invalid ItemPlace: role is required and must be a valid ItemPlaceRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromItemPlace({
        id: 'ip_123',
        itemId: 'item_1',
        placeId: 'place_1',
        role: 'invalid_role',
      })).toThrow('Invalid ItemPlace: role is required and must be a valid ItemPlaceRole');
    });
  });
});
