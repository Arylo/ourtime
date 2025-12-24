import { describe, it, expect } from 'vitest';
import { createWho, fromWho, Who } from './Who';
import { createStoryDate } from './StoryDate';

describe('Who', () => {
  describe('createWho', () => {
    it('应该创建一个带有ULID的Who对象', () => {
      const bornAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const diedAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const who = createWho({
        name: '测试人物',
        description: '这是一个测试人物',
        alias: ['别名1', '别名2'],
        bornAt,
        diedAt,
        parents: ['who_parent', 'world_parent'],
      });

      expect(who).toBeDefined();
      expect(who.id).toBeDefined();
      expect(who.id.length).toBeGreaterThan(0);
      expect(who.name).toBe('测试人物');
      expect(who.description).toBe('这是一个测试人物');
      expect(who.alias).toEqual(['别名1', '别名2']);
      expect(who.bornAt).toEqual(bornAt);
      expect(who.diedAt).toEqual(diedAt);
      expect(who.parents).toEqual(['who_parent', 'world_parent']);
      expect(who.appeared).toBe(false);
    });

    it('应该创建没有别名的Who对象', () => {
      const who = createWho({
        name: '测试人物',
        description: '这是一个测试人物',
      });

      expect(who).toBeDefined();
      expect(who.id).toBeDefined();
      expect(who.name).toBe('测试人物');
      expect(who.description).toBe('这是一个测试人物');
      expect(who.alias).toBeUndefined();
      expect(who.appeared).toBe(false);
    });
  });

  describe('fromWho', () => {
    it('应该从对象创建Who对象', () => {
      const whoData = {
        id: 'who_123',
        name: '测试人物',
        description: '这是一个测试人物',
        alias: ['别名1', '别名2'],
        appeared: true,
      };

      const who = fromWho(whoData);

      expect(who).toBeDefined();
      expect(who.id).toBe('who_123');
      expect(who.name).toBe('测试人物');
      expect(who.description).toBe('这是一个测试人物');
      expect(who.alias).toEqual(['别名1', '别名2']);
      expect(who.appeared).toBe(true);
    });

    it('应该从没有别名的对象创建Who对象', () => {
      const whoData = {
        id: 'who_123',
        name: '测试人物',
        description: '这是一个测试人物',
      };

      const who = fromWho(whoData);

      expect(who).toBeDefined();
      expect(who.id).toBe('who_123');
      expect(who.name).toBe('测试人物');
      expect(who.description).toBe('这是一个测试人物');
      expect(who.alias).toBeUndefined();
    });

    it('当缺少id时应该抛出错误', () => {
      const whoData = {
        name: '测试人物',
        description: '这是一个测试人物',
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const whoData = {
        id: 'who_123',
        description: '这是一个测试人物',
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: name is required and must be a string');
    });

    it('当缺少description时应该抛出错误', () => {
      const whoData = {
        id: 'who_123',
        name: '测试人物',
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: description is required and must be a string');
    });

    it('当id不是字符串时应该抛出错误', () => {
      const whoData = {
        id: 123,
        name: '测试人物',
        description: '这是一个测试人物',
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: id is required and must be a string');
    });

    it('当name不是字符串时应该抛出错误', () => {
      const whoData = {
        id: 'who_123',
        name: 123,
        description: '这是一个测试人物',
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: name is required and must be a string');
    });

    it('当description不是字符串时应该抛出错误', () => {
      const whoData = {
        id: 'who_123',
        name: '测试人物',
        description: 123,
      };

      expect(() => fromWho(whoData)).toThrow('Invalid Who: description is required and must be a string');
    });
  });

  describe('Who接口', () => {
    it('应该符合Who接口定义', () => {
      const who: Who = {
        id: 'who_123',
        name: '测试人物',
        description: '这是一个测试人物',
        alias: ['别名1', '别名2'],
      };

      expect(who.id).toBe('who_123');
      expect(who.name).toBe('测试人物');
      expect(who.description).toBe('这是一个测试人物');
      expect(who.alias).toEqual(['别名1', '别名2']);
    });
  });
});
