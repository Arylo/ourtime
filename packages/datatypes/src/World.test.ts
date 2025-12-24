import { describe, it, expect } from 'vitest';
import { createWorld, fromWorld, type World } from './World';
import { createStoryDate } from './StoryDate';

describe('World', () => {
  describe('createWorld', () => {
    it('应该创建一个带有ULID的World对象', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const world = createWorld({
        name: '测试世界',
        startAt,
        endAt,
      });

      expect(world).toBeDefined();
      expect(world.id).toBeDefined();
      expect(world.id.length).toBeGreaterThan(0);
      expect(world.name).toBe('测试世界');
      expect(world.startAt).toEqual(startAt);
      expect(world.endAt).toEqual(endAt);
    });

    it('应该创建没有可选日期的World对象', () => {
      const world = createWorld({
        name: '测试世界',
      });

      expect(world).toBeDefined();
      expect(world.id).toBeDefined();
      expect(world.name).toBe('测试世界');
      expect(world.startAt).toBeUndefined();
      expect(world.endAt).toBeUndefined();
    });

    it('应该创建带有parents的World对象', () => {
      const world = createWorld({
        name: '子世界',
        parents: ['parent_world_id'],
      });

      expect(world).toBeDefined();
      expect(world.id).toBeDefined();
      expect(world.name).toBe('子世界');
      expect(world.parents).toEqual(['parent_world_id']);
    });
  });

  describe('fromWorld', () => {
    it('应该从对象创建World对象', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const worldData = {
        id: 'world_123',
        name: '测试世界',
        startAt,
        endAt,
      };

      const world = fromWorld(worldData);

      expect(world).toBeDefined();
      expect(world.id).toBe('world_123');
      expect(world.name).toBe('测试世界');
      expect(world.startAt).toEqual(startAt);
      expect(world.endAt).toEqual(endAt);
    });

    it('应该从没有日期的对象创建World对象', () => {
      const worldData = {
        id: 'world_123',
        name: '测试世界',
      };

      const world = fromWorld(worldData);

      expect(world).toBeDefined();
      expect(world.id).toBe('world_123');
      expect(world.name).toBe('测试世界');
      expect(world.startAt).toBeUndefined();
      expect(world.endAt).toBeUndefined();
    });

    it('当缺少name时应该抛出错误', () => {
      const worldData = {
        id: 'world_123',
      };

      expect(() => fromWorld(worldData)).toThrow('Invalid World: name is required and must be a string');
    });

    it('当缺少id时应该抛出错误', () => {
      const worldData = {
        name: '测试世界',
      };

      expect(() => fromWorld(worldData)).toThrow('Invalid World: id is required and must be a string');
    });

    it('当name不是字符串时应该抛出错误', () => {
      const worldData = {
        id: 'world_123',
        name: 123,
      };

      expect(() => fromWorld(worldData)).toThrow('Invalid World: name is required and must be a string');
    });

    it('当id不是字符串时应该抛出错误', () => {
      const worldData = {
        id: 123,
        name: '测试世界',
      };

      expect(() => fromWorld(worldData)).toThrow('Invalid World: id is required and must be a string');
    });

    it('应该从包含parents的对象创建World对象', () => {
      const worldData = {
        id: 'child_world_123',
        name: '子世界',
        parents: ['parent_world_id'],
      };

      const world = fromWorld(worldData);

      expect(world).toBeDefined();
      expect(world.id).toBe('child_world_123');
      expect(world.name).toBe('子世界');
      expect(world.parents).toEqual(['parent_world_id']);
    });

    it('应该从没有parents的对象创建World对象', () => {
      const worldData = {
        id: 'world_123',
        name: '主世界',
      };

      const world = fromWorld(worldData);

      expect(world).toBeDefined();
      expect(world.id).toBe('world_123');
      expect(world.name).toBe('主世界');
      expect(world.parents).toBeUndefined();
    });
  });

  describe('World接口', () => {
    it('应该符合World接口定义', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const world: World = {
        id: 'world_123',
        name: '测试世界',
        startAt,
        endAt,
      };

      expect(world.id).toBe('world_123');
      expect(world.name).toBe('测试世界');
      expect(world.startAt).toEqual(startAt);
      expect(world.endAt).toEqual(endAt);
    });

    it('应该支持可选的parents字段', () => {
      const worldWithoutParents: World = {
        id: 'world_123',
        name: '主世界',
      };

      const worldWithParents: World = {
        id: 'world_456',
        name: '子世界',
        parents: ['world_123'],
      };

      expect(worldWithoutParents.parents).toBeUndefined();
      expect(worldWithParents.parents).toEqual(['world_123']);
    });
  });
});
