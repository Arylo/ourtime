import { describe, it, expect } from 'vitest';
import { createItem, fromItem, type Item } from './Item';
import { createStoryDate } from './StoryDate';

describe('Item', () => {
  describe('createItem', () => {
    it('应该创建一个带有ULID的Item对象', () => {
      const item = createItem({
        name: '测试物品',
        description: '这是一个测试物品',
      });

      expect(item).toBeDefined();
      expect(item.id).toBeDefined();
      expect(item.id.length).toBeGreaterThan(0);
      expect(item.name).toBe('测试物品');
      expect(item.description).toBe('这是一个测试物品');
      expect(item.createdAt).toBeUndefined();
    });

    it('应该创建带有createdAt的Item对象', () => {
      const createdAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const item = createItem({
        name: '测试物品',
        description: '这是一个测试物品',
        createdAt,
      });

      expect(item.createdAt).toEqual(createdAt);
    });

    it('应该创建带有endAt的Item对象', () => {
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const item = createItem({
        name: '测试物品',
        description: '这是一个测试物品',
        endAt,
      });

      expect(item.endAt).toEqual(endAt);
    });
  });

  describe('fromItem', () => {
    it('应该从对象创建Item对象', () => {
      const createdAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const itemData = {
        id: 'item_123',
        name: '测试物品',
        description: '这是一个测试物品',
        createdAt,
      };

      const item = fromItem(itemData);

      expect(item).toBeDefined();
      expect(item.id).toBe('item_123');
      expect(item.name).toBe('测试物品');
      expect(item.description).toBe('这是一个测试物品');
      expect(item.createdAt).toEqual(createdAt);
    });

    it('当缺少id时应该抛出错误', () => {
      const itemData = {
        name: '测试物品',
        description: '这是一个测试物品',
        createdAt: createStoryDate({   rangeStart: 1, rangeEnd: 1, calendarId: 'test_calendar' }),
      };

      expect(() => fromItem(itemData)).toThrow('Invalid Item: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const itemData = {
        id: 'item_123',
        description: '这是一个测试物品',
        createdAt: createStoryDate({   rangeStart: 1, rangeEnd: 1, calendarId: 'test_calendar' }),
      };

      expect(() => fromItem(itemData)).toThrow('Invalid Item: name is required and must be a string');
    });

    it('当缺少description时应该可以正常创建', () => {
      const itemData = {
        id: 'item_123',
        name: '测试物品',
        createdAt: createStoryDate({   rangeStart: 1, rangeEnd: 1, calendarId: 'test_calendar' }),
      };

      const item = fromItem(itemData);
      expect(item.description).toBeUndefined();
    });

    it('当缺少createdAt时应该可以正常创建', () => {
      const itemData = {
        id: 'item_123',
        name: '测试物品',
        description: '这是一个测试物品',
      };

      const item = fromItem(itemData);
      expect(item.createdAt).toBeUndefined();
    });
  });

  describe('Item接口', () => {
    it('应该符合Item接口 definition', () => {
      const item: Item = {
        id: 'item_123',
        name: '测试物品',
        description: '这是一个测试物品',
        createdAt: createStoryDate({   rangeStart: 1, rangeEnd: 1, calendarId: 'test_calendar' }),
      };

      expect(item.id).toBe('item_123');
      expect(item.name).toBe('测试物品');
      expect(item.description).toBe('这是一个测试物品');
    });
  });
});
