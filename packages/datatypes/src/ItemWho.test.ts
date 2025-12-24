import { describe, it, expect } from 'vitest';
import { createItemWho, fromItemWho, ItemWhoRole } from './ItemWho';
import { createStoryDate } from './StoryDate';

describe('ItemWho', () => {
  describe('createItemWho', () => {
    it('应该创建一个带有ULID的ItemWho对象', () => {
      const startAt = createStoryDate({ timelineId: 't1', rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const itemWho = createItemWho({
        itemId: 'item_1',
        whoId: 'who_1',
        role: ItemWhoRole.OWNER,
        startAt,
      });

      expect(itemWho).toBeDefined();
      expect(itemWho.id).toBeDefined();
      expect(itemWho.itemId).toBe('item_1');
      expect(itemWho.whoId).toBe('who_1');
      expect(itemWho.role).toBe(ItemWhoRole.OWNER);
      expect(itemWho.startAt).toEqual(startAt);
    });
  });

  describe('fromItemWho', () => {
    it('应该从对象创建ItemWho对象', () => {
      const itemWhoData = {
        id: 'iw_123',
        itemId: 'item_1',
        whoId: 'who_1',
        role: ItemWhoRole.CREATOR,
      };

      const itemWho = fromItemWho(itemWhoData);

      expect(itemWho).toBeDefined();
      expect(itemWho.id).toBe('iw_123');
      expect(itemWho.role).toBe(ItemWhoRole.CREATOR);
    });

    it('当角色无效时应该抛出错误', () => {
      const itemWhoData = {
        id: 'iw_123',
        itemId: 'item_1',
        whoId: 'who_1',
        role: 'invalid_role',
      };

      expect(() => fromItemWho(itemWhoData)).toThrow('Invalid ItemWho: role is required and must be a valid ItemWhoRole');
    });
  });
});
