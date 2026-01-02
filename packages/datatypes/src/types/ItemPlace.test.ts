import { describe, it, expect } from 'vitest';
import { createItemPlace, fromItemPlace, ItemPlaceRole } from './ItemPlace';
import { createStoryDate } from './StoryDate';

describe('ItemPlace', () => {
  describe('createItemPlace', () => {
    it('应该创建一个带有ULID的ItemPlace对象', () => {
      const itemPlace = createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        key: 'role',
        value: ItemPlaceRole.OWNER,
      });

      expect(itemPlace).toBeDefined();
      expect(itemPlace.id).toBeDefined();
      expect(itemPlace.key).toBe('role');
      expect(itemPlace.value).toBe(ItemPlaceRole.OWNER);
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemPlace({
        placeId: 'place_1',
        key: 'role',
        value: ItemPlaceRole.OWNER,
      } as any)).toThrow('Invalid ItemPlace: itemId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        key: 'role',
        value: ItemPlaceRole.OWNER,
      } as any)).toThrow('Invalid ItemPlace: placeId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        value: ItemPlaceRole.OWNER,
      } as any)).toThrow('Invalid ItemPlace: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid ItemPlace: role value must be a valid ItemPlaceRole');
    });
  });

  describe('fromItemPlace', () => {
    it('应该从对象创建ItemPlace对象', () => {
      const itemPlaceData = {
        id: 'ip_123',
        itemId: 'item_1',
        placeId: 'place_1',
        key: 'role',
        value: ItemPlaceRole.CREATOR,
      };

      const itemPlace = fromItemPlace(itemPlaceData);
      expect(itemPlace.key).toBe('role');
      expect(itemPlace.value).toBe(ItemPlaceRole.CREATOR);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemPlace({
        itemId: 'item_1',
        placeId: 'place_1',
        key: 'role',
        value: ItemPlaceRole.CREATOR,
      })).toThrow('Invalid ItemPlace: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromItemPlace({ id: '1' })).toThrow('Invalid ItemPlace: itemId is required and must be a string');
      expect(() => fromItemPlace({ id: '1', itemId: 'i1' })).toThrow('Invalid ItemPlace: placeId is required and must be a string');
      expect(() => fromItemPlace({ id: '1', itemId: 'i1', placeId: 'p1' })).toThrow('Invalid ItemPlace: key is required and must be role, startAt or endAt');
    });
  });
});
