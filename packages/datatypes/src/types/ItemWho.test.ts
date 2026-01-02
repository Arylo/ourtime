import { describe, it, expect } from 'vitest';
import { createItemWho, fromItemWho, ItemWhoRole } from './ItemWho';
import { createStoryDate } from './StoryDate';

describe('ItemWho', () => {
  describe('createItemWho', () => {
    it('应该创建一个带有ULID的ItemWho对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const itemWho = createItemWho({
        itemId: 'item_1',
        whoId: 'who_1',
        key: 'startAt',
        value: startAt,
      });

      expect(itemWho).toBeDefined();
      expect(itemWho.id).toBeDefined();
      expect(itemWho.itemId).toBe('item_1');
      expect(itemWho.whoId).toBe('who_1');
      expect(itemWho.key).toBe('startAt');
      expect(itemWho.value).toEqual(startAt);
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemWho({
        whoId: 'who_1',
        key: 'role',
        value: ItemWhoRole.OWNER,
      } as any)).toThrow('Invalid ItemWho: itemId is required and must be a string');
    });

    it('当缺少whoId时应该抛出错误', () => {
      expect(() => createItemWho({
        itemId: 'item_1',
        key: 'role',
        value: ItemWhoRole.OWNER,
      } as any)).toThrow('Invalid ItemWho: whoId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createItemWho({
        itemId: 'item_1',
        whoId: 'who_1',
        value: ItemWhoRole.OWNER,
      } as any)).toThrow('Invalid ItemWho: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createItemWho({
        itemId: 'item_1',
        whoId: 'who_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid ItemWho: role value must be a valid ItemWhoRole');
    });
  });

  describe('fromItemWho', () => {
    it('应该从对象创建ItemWho对象', () => {
      const itemWhoData = {
        id: 'iw_123',
        itemId: 'item_1',
        whoId: 'who_1',
        key: 'role',
        value: ItemWhoRole.CREATOR,
      };

      const itemWho = fromItemWho(itemWhoData);

      expect(itemWho).toBeDefined();
      expect(itemWho.id).toBe('iw_123');
      expect(itemWho.key).toBe('role');
      expect(itemWho.value).toBe(ItemWhoRole.CREATOR);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemWho({
        itemId: 'item_1',
        whoId: 'who_1',
        key: 'role',
        value: ItemWhoRole.CREATOR,
      })).toThrow('Invalid ItemWho: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromItemWho({ id: '1' })).toThrow('Invalid ItemWho: itemId is required and must be a string');
      expect(() => fromItemWho({ id: '1', itemId: 'i1' })).toThrow('Invalid ItemWho: whoId is required and must be a string');
      expect(() => fromItemWho({ id: '1', itemId: 'i1', whoId: 'h1' })).toThrow('Invalid ItemWho: key is required and must be role, startAt or endAt');
    });
  });
});
