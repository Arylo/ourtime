import { describe, it, expect } from 'vitest';
import { createOrganize, fromOrganize, type Organize } from './Organize';
import { createStoryDate } from './StoryDate';

describe('Organize', () => {
  describe('createOrganize', () => {
    it('应该创建一个带有ULID的Organize对象', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const organize = createOrganize({
        name: '测试组织',
        description: '这是一个测试组织',
        startAt,
        endAt,
      });

      expect(organize).toBeDefined();
      expect(organize.id).toBeDefined();
      expect(organize.id.length).toBeGreaterThan(0);
      expect(organize.name).toBe('测试组织');
      expect(organize.description).toBe('这是一个测试组织');
      expect(organize.startAt).toEqual(startAt);
      expect(organize.endAt).toEqual(endAt);
    });

    it('应该创建没有可选日期的Organize对象', () => {
      const organize = createOrganize({
        name: '测试组织',
        description: '这是一个测试组织',
      });

      expect(organize).toBeDefined();
      expect(organize.id).toBeDefined();
      expect(organize.name).toBe('测试组织');
      expect(organize.description).toBe('这是一个测试组织');
      expect(organize.startAt).toBeUndefined();
      expect(organize.endAt).toBeUndefined();
    });
  });

  describe('fromOrganize', () => {
    it('应该从对象创建Organize对象', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const organizeData = {
        id: 'org_123',
        name: '测试组织',
        description: '这是一个测试组织',
        startAt,
        endAt,
      };

      const organize = fromOrganize(organizeData);

      expect(organize).toBeDefined();
      expect(organize.id).toBe('org_123');
      expect(organize.name).toBe('测试组织');
      expect(organize.description).toBe('这是一个测试组织');
      expect(organize.startAt).toEqual(startAt);
      expect(organize.endAt).toEqual(endAt);
    });

    it('应该从没有可选字段的对象创建Organize对象', () => {
      const organizeData = {
        id: 'org_123',
        name: '测试组织',
        description: '这是一个测试组织',
      };

      const organize = fromOrganize(organizeData);

      expect(organize).toBeDefined();
      expect(organize.id).toBe('org_123');
      expect(organize.name).toBe('测试组织');
      expect(organize.description).toBe('这是一个测试组织');
      expect(organize.startAt).toBeUndefined();
      expect(organize.endAt).toBeUndefined();
    });

    it('当缺少id时应该抛出错误', () => {
      const organizeData = {
        name: '测试组织',
        description: '这是一个测试组织',
      };

      expect(() => fromOrganize(organizeData)).toThrow('Invalid Organize: id is required and must be a string');
    });

    it('当缺少name时应该抛出错误', () => {
      const organizeData = {
        id: 'org_123',
        description: '这是一个测试组织',
      };

      expect(() => fromOrganize(organizeData)).toThrow('Invalid Organize: name is required and must be a string');
    });

    it('当缺少description时应该可以正常创建', () => {
      const organizeData = {
        id: 'org_123',
        name: '测试组织',
      };

      const organize = fromOrganize(organizeData);
      expect(organize.description).toBeUndefined();
    });

    it('当name不是字符串时应该抛出错误', () => {
      const organizeData = {
        id: 'org_123',
        name: 123,
        description: '这是一个测试组织',
      };

      expect(() => fromOrganize(organizeData)).toThrow('Invalid Organize: name is required and must be a string');
    });

    it('当id不是字符串时应该抛出错误', () => {
      const organizeData = {
        id: 123,
        name: '测试组织',
        description: '这是一个测试组织',
      };

      expect(() => fromOrganize(organizeData)).toThrow('Invalid Organize: id is required and must be a string');
    });

    it('当description不是字符串时应该抛出错误', () => {
      const organizeData = {
        id: 'org_123',
        name: '测试组织',
        description: 123,
      };

      expect(() => fromOrganize(organizeData)).toThrow('Invalid Organize: description is required and must be a string');
    });
  });

  describe('Organize接口', () => {
    it('应该符合Organize接口定义', () => {
      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const organize: Organize = {
        id: 'org_123',
        name: '测试组织',
        description: '这是一个测试组织',
        startAt,
        endAt,
      };

      expect(organize.id).toBe('org_123');
      expect(organize.name).toBe('测试组织');
      expect(organize.description).toBe('这是一个测试组织');
      expect(organize.startAt).toEqual(startAt);
      expect(organize.endAt).toEqual(endAt);
    });

    it('应该支持可选的startAt、endAt和location字段', () => {
      const organizeWithoutOptional: Organize = {
        id: 'org_123',
        name: '测试组织',
        description: '这是一个测试组织',
      };

      const startAt = createStoryDate({ timelineId: 't1',  rangeStart: 1000, rangeEnd: 1000, calendarId: 'test_calendar' });
      const endAt = createStoryDate({ timelineId: 't1',  rangeStart: 2000, rangeEnd: 2000, calendarId: 'test_calendar' });
      const organizeWithOptional: Organize = {
        id: 'org_456',
        name: '测试组织',
        description: '这是一个测试组织',
        startAt,
        endAt,
      };

      expect(organizeWithoutOptional.startAt).toBeUndefined();
      expect(organizeWithoutOptional.endAt).toBeUndefined();

      expect(organizeWithOptional.startAt).toEqual(startAt);
      expect(organizeWithOptional.endAt).toEqual(endAt);
    });
  });
});
