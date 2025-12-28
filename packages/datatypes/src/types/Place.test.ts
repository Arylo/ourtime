import { describe, it, expect } from 'vitest';
import { createPlace, fromPlace, type Place } from './Place';
import { createStoryDate } from './StoryDate';

describe('Place', () => {
  describe('createPlace', () => {
    it('应该创建一个带有ULID的Place对象', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const place = createPlace({
        name: '测试地点',
        locatedId: 'parent_place_123',
        startAt,
        endAt,
      });

      expect(place).toBeDefined();
      expect(place.id).toBeDefined();
      expect(place.id.length).toBeGreaterThan(0);
      expect(place.name).toBe('测试地点');
      expect(place.locatedId).toBe('parent_place_123');
      expect(place.startAt).toEqual(startAt);
      expect(place.endAt).toEqual(endAt);
    });

    it('应该创建没有可选日期的Place对象', () => {
      const place = createPlace({
        name: '测试地点',
      });

      expect(place).toBeDefined();
      expect(place.id).toBeDefined();
      expect(place.name).toBe('测试地点');
      expect(place.locatedId).toBeUndefined();
      expect(place.startAt).toBeUndefined();
      expect(place.endAt).toBeUndefined();
    });

    it('应该支持位于另一个地点', () => {
      const place = createPlace({
        name: '子地点',
        locatedId: 'parent_place_123',
      });
      expect(place.locatedId).toBe('parent_place_123');
    });

    it('应该创建带有description的Place对象', () => {
      const place = createPlace({
        name: '测试地点',
        description: '这是一个测试地点的详细描述',
      });

      expect(place).toBeDefined();
      expect(place.id).toBeDefined();
      expect(place.name).toBe('测试地点');
      expect(place.description).toBe('这是一个测试地点的详细描述');
    });

    it('应该创建没有description的Place对象', () => {
      const place = createPlace({
        name: '测试地点',
      });

      expect(place).toBeDefined();
      expect(place.id).toBeDefined();
      expect(place.name).toBe('测试地点');
      expect(place.description).toBeUndefined();
    });
  });

  describe('fromPlace', () => {
    it('应该从对象创建Place对象', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const placeData = {
        id: 'place_123',
        name: '测试地点',
        locatedId: 'parent_place_123',
        startAt,
        endAt,
      };

      const place = fromPlace(placeData);

      expect(place).toBeDefined();
      expect(place.id).toBe('place_123');
      expect(place.name).toBe('测试地点');
      expect(place.locatedId).toBe('parent_place_123');
      expect(place.startAt).toEqual(startAt);
      expect(place.endAt).toEqual(endAt);
    });

    it('应该从没有日期的对象创建Place对象', () => {
      const placeData = {
        id: 'place_123',
        name: '测试地点',
      };

      const place = fromPlace(placeData);

      expect(place).toBeDefined();
      expect(place.id).toBe('place_123');
      expect(place.name).toBe('测试地点');
      expect(place.locatedId).toBeUndefined();
      expect(place.startAt).toBeUndefined();
      expect(place.endAt).toBeUndefined();
    });

    it('应该从带有description的对象创建Place对象', () => {
      const placeData = {
        id: 'place_123',
        name: '测试地点',
        description: '这是一个测试地点的详细描述',
      };

      const place = fromPlace(placeData);

      expect(place).toBeDefined();
      expect(place.id).toBe('place_123');
      expect(place.name).toBe('测试地点');
      expect(place.description).toBe('这是一个测试地点的详细描述');
    });

    it('应该从没有description的对象创建Place对象', () => {
      const placeData = {
        id: 'place_123',
        name: '测试地点',
      };

      const place = fromPlace(placeData);

      expect(place).toBeDefined();
      expect(place.id).toBe('place_123');
      expect(place.name).toBe('测试地点');
      expect(place.description).toBeUndefined();
    });

    it('当缺少id时应该抛出错误', () => {
      const placeData = {
        name: '测试地点',
      };

      expect(() => fromPlace(placeData)).toThrow('Invalid Place: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const placeData = {
        id: 'place_123',
      };

      expect(() => fromPlace(placeData)).toThrow('Invalid Place: name is required and must be a string');
    });

    it('不应该在缺少locatedId时抛出错误', () => {
      const placeData = {
        id: 'place_123',
        name: '测试地点',
      };

      const place = fromPlace(placeData);
      expect(place.locatedId).toBeUndefined();
    });

    it('当id不是字符串时应该抛出错误', () => {
      const placeData = {
        id: 123,
        name: '测试地点',
        locatedId: 'world_123',
      };

      expect(() => fromPlace(placeData)).toThrow('Invalid Place: id is required and must be a string');
    });

    it('当name不是字符串时应该抛出错误', () => {
      const placeData = {
        id: 'place_123',
        name: 123,
        locatedId: 'world_123',
      };

      expect(() => fromPlace(placeData)).toThrow('Invalid Place: name is required and must be a string');
    });

    it('当locatedId不是字符串时应该抛出错误', () => {
      const placeData = {
        id: 'place_123',
        name: '测试地点',
        locatedId: 123,
      };

      expect(() => fromPlace(placeData)).toThrow('Invalid Place: locatedId must be a string');
    });
  });

  describe('Place接口', () => {
    it('应该符合Place接口定义', () => {
      const startAt = createStoryDate({   rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({   rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const place: Place = {
        id: 'place_123',
        name: '测试地点',
        locatedId: 'world_123',
        startAt,
        endAt,
      };

      expect(place.id).toBe('place_123');
      expect(place.name).toBe('测试地点');
      expect(place.locatedId).toBe('world_123');
      expect(place.startAt).toEqual(startAt);
      expect(place.endAt).toEqual(endAt);
    });
  });
});
