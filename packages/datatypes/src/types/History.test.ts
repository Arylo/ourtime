import { describe, it, expect } from 'vitest';
import { createHistory, fromHistory, type History } from './History';
import { createStoryDate } from './StoryDate';

describe('History', () => {
  describe('createHistory', () => {
    it('应该创建一个带有ULID的History对象', () => {
      const event = createHistory({
        name: '测试事件',
        alias: ['别名1', '别名2'],
        parentEvent: 'parent_event_123',
      });

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.id.length).toBeGreaterThan(0);
      expect(event.name).toBe('测试事件');
      expect(event.alias).toEqual(['别名1', '别名2']);
      expect(event.parentEvent).toBe('parent_event_123');
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
      expect(event.alias).toBeUndefined();
      expect(event.parentEvent).toBeUndefined();
    });
  });

  describe('fromHistory', () => {
    it('应该从对象创建History对象', () => {
      const eventData = {
        id: 'event_123',
        name: '测试事件',
        alias: ['别名1', '别名2'],
        parentEvent: 'parent_event_123',
      };

      const event = fromHistory(eventData);

      expect(event).toBeDefined();
      expect(event.id).toBe('event_123');
      expect(event.name).toBe('测试事件');
      expect(event.alias).toEqual(['别名1', '别名2']);
      expect(event.parentEvent).toBe('parent_event_123');
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
      expect(event.alias).toBeUndefined();
      expect(event.parentEvent).toBeUndefined();
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
        alias: '不是数组',
      };

      expect(() => fromHistory(eventData)).toThrow('Invalid History: alias must be an array when provided');
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
      const event: History = {
        id: 'event_123',
        name: '测试事件',
        alias: ['别名1', '别名2'],
        parentEvent: 'parent_event_123',
      };

      expect(event.id).toBe('event_123');
      expect(event.name).toBe('测试事件');
      expect(event.alias).toEqual(['别名1', '别名2']);
      expect(event.parentEvent).toBe('parent_event_123');
    });

    it('应该支持可选的alias和parentEvent字段', () => {
      const eventWithoutOptional: History = {
        id: 'event_123',
        name: '测试事件',
      };

      const eventWithOptional: History = {
        id: 'event_456',
        name: '测试事件',
        alias: ['别名'],
        parentEvent: 'parent_event_123',
      };

      expect(eventWithoutOptional.alias).toBeUndefined();
      expect(eventWithoutOptional.parentEvent).toBeUndefined();

      expect(eventWithOptional.alias).toEqual(['别名']);
      expect(eventWithOptional.parentEvent).toBe('parent_event_123');
    });
  });
});
