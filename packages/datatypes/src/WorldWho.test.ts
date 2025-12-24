import { describe, it, expect } from 'vitest';
import { createWorldWho, fromWorldWho, WorldWhoRole } from './WorldWho';
import { createStoryDate } from './StoryDate';

describe('WorldWho', () => {
  describe('createWorldWho', () => {
    it('应该创建一个带有ULID的WorldWho对象', () => {
      const worldWho = createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        role: WorldWhoRole.OWNER,
      });

      expect(worldWho).toBeDefined();
      expect(worldWho.id).toBeDefined();
      expect(worldWho.id.length).toBeGreaterThan(0);
      expect(worldWho.worldId).toBe('world_123');
      expect(worldWho.whoId).toBe('who_123');
      expect(worldWho.role).toBe(WorldWhoRole.OWNER);
    });

    it('应该创建带有时间范围的WorldWho对象', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const worldWho = createWorldWho({
        worldId: 'world_123',
        whoId: 'who_123',
        startAt,
        endAt,
      });

      expect(worldWho.startAt).toEqual(startAt);
      expect(worldWho.endAt).toEqual(endAt);
    });
  });

  describe('fromWorldWho', () => {
    it('应该从对象创建WorldWho对象', () => {
      const worldWhoData = {
        id: 'ww_123',
        worldId: 'world_123',
        whoId: 'who_123',
        role: WorldWhoRole.OWNER,
      };

      const worldWho = fromWorldWho(worldWhoData);

      expect(worldWho).toBeDefined();
      expect(worldWho.id).toBe('ww_123');
      expect(worldWho.worldId).toBe('world_123');
      expect(worldWho.whoId).toBe('who_123');
      expect(worldWho.role).toBe(WorldWhoRole.OWNER);
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromWorldWho({ id: '1' })).toThrow('Invalid WorldWho: worldId is required');
      expect(() => fromWorldWho({ id: '1', worldId: 'w1' })).toThrow('Invalid WorldWho: whoId is required');
    });
  });
});
