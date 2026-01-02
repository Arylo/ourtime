import { describe, it, expect } from 'vitest';
import { createOrganizePlace, fromOrganizePlace } from './OrganizePlace';
import { createStoryDate } from './StoryDate';

describe('OrganizePlace', () => {
  describe('createOrganizePlace', () => {
    it('应该创建一个带有ULID的OrganizePlace对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const organizePlace = createOrganizePlace({
        organizeId: 'org_123',
        placeId: 'place_123',
        key: 'startAt',
        value: startAt,
      });

      expect(organizePlace).toBeDefined();
      expect(organizePlace.id).toBeDefined();
      expect(organizePlace.id.length).toBeGreaterThan(0);
      expect(organizePlace.organizeId).toBe('org_123');
      expect(organizePlace.placeId).toBe('place_123');
      expect(organizePlace.key).toBe('startAt');
      expect(organizePlace.value).toEqual(startAt);
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createOrganizePlace({
        placeId: 'place_123',
        key: 'startAt',
        value: createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' }),
      } as any)).toThrow('Invalid OrganizePlace: organizeId is required and must be a string');
    });

    it('当缺少placeId时应该抛出错误', () => {
      expect(() => createOrganizePlace({
        organizeId: 'org_123',
        key: 'startAt',
        value: createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' }),
      } as any)).toThrow('Invalid OrganizePlace: placeId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createOrganizePlace({
        organizeId: 'org_123',
        placeId: 'place_123',
        value: createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' }),
      } as any)).toThrow('Invalid OrganizePlace: key is required and must be startAt or endAt');
    });
  });

  describe('fromOrganizePlace', () => {
    it('应该从对象创建OrganizePlace对象', () => {
      const startAt = createStoryDate({ rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const organizePlaceData = {
        id: 'op_123',
        organizeId: 'org_123',
        placeId: 'place_123',
        key: 'startAt',
        value: startAt,
      };

      const organizePlace = fromOrganizePlace(organizePlaceData);

      expect(organizePlace).toBeDefined();
      expect(organizePlace.id).toBe('op_123');
      expect(organizePlace.organizeId).toBe('org_123');
      expect(organizePlace.placeId).toBe('place_123');
      expect(organizePlace.key).toBe('startAt');
      expect(organizePlace.value).toEqual(startAt);
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromOrganizePlace({ id: '1' })).toThrow('Invalid OrganizePlace: organizeId is required');
      expect(() => fromOrganizePlace({ id: '1', organizeId: 'o1' })).toThrow('Invalid OrganizePlace: placeId is required');
      expect(() => fromOrganizePlace({ organizeId: 'o1', placeId: 'p1' })).toThrow('Invalid OrganizePlace: id is required');
    });
  });
});
