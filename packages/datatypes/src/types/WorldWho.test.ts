import { describe, it, expect } from 'vitest';
import { createWorldWho, fromWorldWho, WorldWhoRole } from './WorldWho';
import { createStoryDate } from './StoryDate';

describe('WorldWho', () => {
  describe('createWorldWho', () => {
    it('应该创建一个带有ULID的WorldWho对象', () => {
      const worldWho = createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        key: 'role',
        value: WorldWhoRole.OWNER,
      });

      expect(worldWho).toBeDefined();
      expect(worldWho.id).toBeDefined();
      expect(worldWho.id.length).toBeGreaterThan(0);
      expect(worldWho.worldId).toBe('world_123');
      expect(worldWho.whoId).toBe('who_123');
      expect(worldWho.key).toBe('role');
      expect(worldWho.value).toBe(WorldWhoRole.OWNER);
    });

    it('应该创建带有时间范围的WorldWho对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const worldWho = createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        key: 'startAt',
        value: startAt,
      });

      expect(worldWho.key).toBe('startAt');
      expect(worldWho.value).toEqual(startAt);
    });

    it('当key无效时应该抛出错误', () => {
      expect(() => createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        key: 'invalid_key' as any,
        value: WorldWhoRole.OWNER,
      })).toThrow('Invalid WorldWho: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        key: 'role',
        value: 'invalid_role' as any,
      })).toThrow('Invalid WorldWho: role value must be a valid WorldWhoRole');
    });
  });

  describe('fromWorldWho', () => {
    it('应该从对象创建WorldWho对象', () => {
      const worldWhoData = {
        id: 'ww_123',
        worldId: 'world_123',
        whoId: 'who_123',
        key: 'role',
        value: WorldWhoRole.OWNER,
      };

      const worldWho = fromWorldWho(worldWhoData);

      expect(worldWho).toBeDefined();
      expect(worldWho.id).toBe('ww_123');
      expect(worldWho.worldId).toBe('world_123');
      expect(worldWho.whoId).toBe('who_123');
      expect(worldWho.key).toBe('role');
      expect(worldWho.value).toBe(WorldWhoRole.OWNER);
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromWorldWho({ id: '1' })).toThrow('Invalid WorldWho: worldId is required and must be a string');
      expect(() => fromWorldWho({ id: '1', worldId: 'w1' })).toThrow('Invalid WorldWho: whoId is required and must be a string');
      expect(() => fromWorldWho({ id: '1', worldId: 'w1', whoId: 'h1' })).toThrow('Invalid WorldWho: key is required and must be role, startAt or endAt');
    });
  });
});
