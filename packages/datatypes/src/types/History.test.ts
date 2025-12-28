import { describe, it, expect } from 'vitest';
import { createHistory, fromHistory, AffectedItem, type History } from './History';
import type { World } from './World';
import type { Who } from './Who';
import type { Item } from './Item';
import type { Organize } from './Organize';
import { createStoryDate } from './StoryDate';

const world: World = { id: 'world_1', name: '世界' };
const who: Who = { id: 'who_1', name: '人物', description: '描述' };
const item: Item = { id: 'item_1', name: '物品', description: '物品描述' };
const organize: Organize = { id: 'organize_1', name: '组织', description: '组织描述' };

describe('History', () => {
  describe('createHistory', () => {
    it('应该创建一个带有ULID的History对象', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const event = createHistory({
        name: '测试事件',
        alias: ['别名1', '别名2'],
        startAt,
        endAt,
        parentEvent: 'parent_event_123',
        affected: [
          [world, 'name', '新世界名称'],
          [who, 'name', '新人物名称'],
          [item, 'name', '新物品名称'],
          [organize, 'name', '新组织名称'],
        ] as AffectedItem[],
      });

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.id.length).toBeGreaterThan(0);
      expect(event.name).toBe('测试事件');
      expect(event.alias).toEqual(['别名1', '别名2']);
      expect(event.startAt).toEqual(startAt);
      expect(event.endAt).toEqual(endAt);
      expect(event.parentEvent).toBe('parent_event_123');
      expect(event.affected).toEqual([
        [world, 'name', '新世界名称'],
        [who, 'name', '新人物名称'],
        [item, 'name', '新物品名称'],
        [organize, 'name', '新组织名称'],
      ]);
    });

    it('应该创建带有别名的History对象', () => {
      const event = createHistory({
        name: '测试事件',
        alias: ['别名1'],
      });
      expect(event.alias).toEqual(['别名1']);
    });

    it('应该创建没有可选字段的History对象', () => {
      const event = createHistory({
        name: '测试事件',
      });

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.name).toBe('测试事件');
      expect(event.startAt).toBeUndefined();
      expect(event.endAt).toBeUndefined();
      expect(event.parentEvent).toBeUndefined();
      expect(event.affected).toBeUndefined();
    });
  });

  describe('fromHistory', () => {
    it('应该从对象创建History对象', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const eventData = {
        id: 'event_123',
        name: '测试事件',
        startAt,
        endAt,
        parentEvent: 'parent_event_123',
        affected: [
          [world, 'name', '新世界名称'],
          [who, 'name', '新人物名称'],
          [item, 'name', '新物品名称'],
          [organize, 'name', '新组织名称'],
        ],
      };

      const event = fromHistory(eventData);

      expect(event).toBeDefined();
      expect(event.id).toBe('event_123');
      expect(event.name).toBe('测试事件');
      expect(event.startAt).toEqual(startAt);
      expect(event.endAt).toEqual(endAt);
      expect(event.parentEvent).toBe('parent_event_123');
      expect(event.affected).toEqual([
        [world, 'name', '新世界名称'],
        [who, 'name', '新人物名称'],
        [item, 'name', '新物品名称'],
        [organize, 'name', '新组织名称'],
      ]);
    });

    it('应该从没有可选字段的对象创建History对象', () => {
      const eventData = {
        id: 'event_123',
        name: '测试事件',
      };

      const event = fromHistory(eventData);

      expect(event).toBeDefined();
      expect(event.id).toBe('event_123');
      expect(event.name).toBe('测试事件');
      expect(event.startAt).toBeUndefined();
      expect(event.endAt).toBeUndefined();
      expect(event.affected).toBeUndefined();
    });

    it('当缺少id时应该抛出错误', () => {
      const eventData = {
        name: '测试事件',
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const eventData = {
        id: 'event_123',
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: name is required and must be a string');
    });

    it('当alias不是数组时应该抛出错误', () => {
      const eventData = {
        id: 'event_123',
        name: '测试事件',
        alias: '别名1',
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: alias must be an array when provided');
    });

    it('当id不是字符串时应该抛出错误', () => {
      const eventData = {
        id: 123,
        name: '测试事件',
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: id is required and must be a string');
    });

    it('当name不是字符串时应该抛出错误', () => {
      const eventData = {
        id: 'event_123',
        name: 123,
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: name is required and must be a string');
    });

    it('当parentEvent不是字符串时应该抛出错误', () => {
      const eventData = {
        id: 'event_123',
        name: '测试事件',
        parentEvent: 123,
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: parentEvent must be a string when provided');
    });
  });

  describe('History接口', () => {
    it('应该符合History接口定义', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const event: History = {
        id: 'event_123',
        name: '测试事件',
        startAt,
        endAt,
        parentEvent: 'parent_event_123',
        affected: [
          [world, 'name', '新世界名称'],
          [who, 'name', '新人物名称'],
          [item, 'name', '新物品名称'],
          [organize, 'name', '新组织名称'],
        ] as AffectedItem[],
      };

      expect(event.id).toBe('event_123');
      expect(event.name).toBe('测试事件');
      expect(event.startAt).toEqual(startAt);
      expect(event.endAt).toEqual(endAt);
      expect(event.parentEvent).toBe('parent_event_123');
      expect(event.affected).toEqual([
        [world, 'name', '新世界名称'],
        [who, 'name', '新人物名称'],
        [item, 'name', '新物品名称'],
        [organize, 'name', '新组织名称'],
      ]);
    });

    it('应该支持Item的AffectedItem', () => {
      const event: History = {
        id: 'event_123',
        name: '测试事件',
        affected: [
          [item, 'name', '物品名称'],
        ] as AffectedItem[],
      };

      expect(event.affected).toHaveLength(1);
      expect(event.affected?.[0]).toEqual([item, 'name', '物品名称']);
    });

    it('应该支持Organize的AffectedItem', () => {
      const event: History = {
        id: 'event_123',
        name: '测试事件',
        affected: [
          [organize, 'name', '组织名称'],
          [organize, 'description', '组织描述'],
        ] as AffectedItem[],
      };

      expect(event.affected).toHaveLength(2);
      expect(event.affected?.[0]).toEqual([organize, 'name', '组织名称']);
      expect(event.affected?.[1]).toEqual([organize, 'description', '组织描述']);
    });
  });
});
