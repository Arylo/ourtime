import { describe, it, expect } from 'vitest';
import { createOrganizePlace, fromOrganizePlace } from './OrganizePlace';
import { createStoryDate } from './StoryDate';

describe('OrganizePlace', () => {
  describe('createOrganizePlace', () => {
    it('应该创建一个带有ULID的OrganizePlace对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const organizePlace = createOrganizePlace({
        organizeId: 'org_123',
        placeId: 'place_123',
        startAt,
        endAt,
      });

      expect(organizePlace).toBeDefined();
      expect(organizePlace.id).toBeDefined();
      expect(organizePlace.id.length).toBeGreaterThan(0);
      expect(organizePlace.organizeId).toBe('org_123');
      expect(organizePlace.placeId).toBe('place_123');
      expect(organizePlace.startAt).toEqual(startAt);
      expect(organizePlace.endAt).toEqual(endAt);
    });

    it('应该创建没有可选日期的OrganizePlace对象', () => {
      const organizePlace = createOrganizePlace({
        organizeId: 'org_123',
        placeId: 'place_123',
      });

      expect(organizePlace).toBeDefined();
      expect(organizePlace.id).toBeDefined();
      expect(organizePlace.organizeId).toBe('org_123');
      expect(organizePlace.placeId).toBe('place_123');
      expect(organizePlace.startAt).toBeUndefined();
      expect(organizePlace.endAt).toBeUndefined();
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createOrganizePlace({
        placeId: 'place_123',
      } as any)).toThrow('Invalid OrganizePlace: organizeId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createOrganizePlace({
        organizeId: 'org_123',
      } as any)).toThrow('Invalid OrganizePlace: placeId is required and must be a string');
    });
  });

  describe('fromOrganizePlace', () => {
    it('应该从对象创建OrganizePlace对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const organizePlaceData = {
        id: 'op_123',
        organizeId: 'org_123',
        placeId: 'place_123',
        startAt,
      };

      const organizePlace = fromOrganizePlace(organizePlaceData);

      expect(organizePlace).toBeDefined();
      expect(organizePlace.id).toBe('op_123');
      expect(organizePlace.organizeId).toBe('org_123');
      expect(organizePlace.placeId).toBe('place_123');
      expect(organizePlace.startAt).toEqual(startAt);
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromOrganizePlace({ id: '1' })).toThrow('Invalid OrganizePlace: organizeId is required');
      expect(() => fromOrganizePlace({ id: '1', organizeId: 'o1' })).toThrow('Invalid OrganizePlace: placeId is required');
      expect(() => fromOrganizePlace({ organizeId: 'o1', placeId: 'p1' })).toThrow('Invalid OrganizePlace: id is required');
    });
  });
});
