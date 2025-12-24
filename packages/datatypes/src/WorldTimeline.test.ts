import { describe, it, expect } from 'vitest';
import { createWorldTimeline, fromWorldTimeline } from './WorldTimeline';

describe('WorldTimeline', () => {
  describe('createWorldTimeline', () => {
    it('应该创建一个带有ULID的WorldTimeline对象', () => {
      const worldTimeline = createWorldTimeline({
        worldId: 'world_123',
        timelineId: 'timeline_123',
      });

      expect(worldTimeline).toBeDefined();
      expect(worldTimeline.id).toBeDefined();
      expect(worldTimeline.id.length).toBeGreaterThan(0);
      expect(worldTimeline.worldId).toBe('world_123');
      expect(worldTimeline.timelineId).toBe('timeline_123');
    });
  });

  describe('fromWorldTimeline', () => {
    it('应该从对象创建WorldTimeline对象', () => {
      const worldTimelineData = {
        id: 'wt_123',
        worldId: 'world_123',
        timelineId: 'timeline_123',
      };

      const worldTimeline = fromWorldTimeline(worldTimelineData);

      expect(worldTimeline).toBeDefined();
      expect(worldTimeline.id).toBe('wt_123');
      expect(worldTimeline.worldId).toBe('world_123');
      expect(worldTimeline.timelineId).toBe('timeline_123');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromWorldTimeline({ id: '1' })).toThrow('Invalid WorldTimeline: worldId is required');
      expect(() => fromWorldTimeline({ id: '1', worldId: 'w1' })).toThrow('Invalid WorldTimeline: timelineId is required');
      expect(() => fromWorldTimeline({ worldId: 'w1', timelineId: 't1' })).toThrow('Invalid WorldTimeline: id is required');
    });
  });
});
