import { describe, it, expect } from 'vitest';
import { createOrganizeWho, fromOrganizeWho, OrganizeWhoRole } from './OrganizeWho';
import { createStoryDate } from './StoryDate';

describe('OrganizeWho', () => {
  describe('createOrganizeWho', () => {
    it('应该创建一个带有ULID的OrganizeWho对象', () => {
      const startAt = createStoryDate({ rangeStart: 0, rangeEnd: 10, timelineId: 't1', calendarId: 'c1' });
      const endAt = createStoryDate({ rangeStart: 20, rangeEnd: 30, timelineId: 't1', calendarId: 'c1' });
      const organizeWho = createOrganizeWho({
        organizeId: 'org_1',
        whoId: 'who_1',
        role: OrganizeWhoRole.MEMBER,
        startAt,
        endAt,
      });

      expect(organizeWho).toBeDefined();
      expect(organizeWho.id).toBeDefined();
      expect(organizeWho.organizeId).toBe('org_1');
      expect(organizeWho.whoId).toBe('who_1');
      expect(organizeWho.role).toBe(OrganizeWhoRole.MEMBER);
      expect(organizeWho.startAt).toEqual(startAt);
      expect(organizeWho.endAt).toEqual(endAt);
    });

    it('应该创建没有可选日期的OrganizeWho对象', () => {
      const organizeWho = createOrganizeWho({
        organizeId: 'org_1',
        whoId: 'who_1',
        role: OrganizeWhoRole.LEADER,
      });

      expect(organizeWho).toBeDefined();
      expect(organizeWho.id).toBeDefined();
      expect(organizeWho.organizeId).toBe('org_1');
      expect(organizeWho.whoId).toBe('who_1');
      expect(organizeWho.role).toBe(OrganizeWhoRole.LEADER);
      expect(organizeWho.startAt).toBeUndefined();
      expect(organizeWho.endAt).toBeUndefined();
    });
  });

  describe('fromOrganizeWho', () => {
    it('应该从对象创建OrganizeWho对象', () => {
      const startAt = createStoryDate({ rangeStart: 5, rangeEnd: 6, timelineId: 't1', calendarId: 'c1' });
      const organizeWhoData = {
        id: 'ow_123',
        organizeId: 'org_1',
        whoId: 'who_1',
        role: OrganizeWhoRole.MEMBER,
        startAt,
      };

      const organizeWho = fromOrganizeWho(organizeWhoData);
      expect(organizeWho).toBeDefined();
      expect(organizeWho.id).toBe('ow_123');
      expect(organizeWho.organizeId).toBe('org_1');
      expect(organizeWho.whoId).toBe('who_1');
      expect(organizeWho.role).toBe(OrganizeWhoRole.MEMBER);
      expect(organizeWho.startAt).toEqual(startAt);
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromOrganizeWho({ id: '1' })).toThrow('Invalid OrganizeWho: organizeId is required');
      expect(() => fromOrganizeWho({ id: '1', organizeId: 'o1' })).toThrow('Invalid OrganizeWho: whoId is required');
      expect(() => fromOrganizeWho({ organizeId: 'o1', whoId: 'w1' })).toThrow('Invalid OrganizeWho: id is required');
      expect(() => fromOrganizeWho({ id: '1', organizeId: 'o1', whoId: 'w1', role: 'INVALID' })).toThrow('Invalid OrganizeWho: role is required and must be a valid OrganizeWhoRole');
    });
  });
});
