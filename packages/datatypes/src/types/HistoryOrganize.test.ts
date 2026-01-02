import { describe, it, expect } from 'vitest';
import { createHistoryOrganize, fromHistoryOrganize, HistoryOrganizeRole } from './HistoryOrganize';
import { createStoryDate } from './StoryDate';

describe('HistoryOrganize', () => {
  describe('createHistoryOrganize', () => {
    it('应该创建一个带有ULID加key-value的HistoryOrganize对象', () => {
      const eventOrganize = createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        key: 'role',
        value: HistoryOrganizeRole.PARTICIPANT,
      });

      expect(eventOrganize).toBeDefined();
      expect(eventOrganize.id).toBeDefined();
      expect(eventOrganize.key).toBe('role');
      expect(eventOrganize.value).toBe(HistoryOrganizeRole.PARTICIPANT);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        organizeId: 'org_1',
        key: 'role',
        value: HistoryOrganizeRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryOrganize: historyId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        key: 'role',
        value: HistoryOrganizeRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryOrganize: organizeId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        value: HistoryOrganizeRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryOrganize: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid HistoryOrganize: role value must be a valid HistoryOrganizeRole');
    });
  });

  describe('fromHistoryOrganize', () => {
    it('应该从对象创建HistoryOrganize对象', () => {
      const eventOrganizeData = {
        id: 'eo_123',
        historyId: 'history_1',
        organizeId: 'org_1',
        key: 'role',
        value: HistoryOrganizeRole.PARTICIPANT,
      };

      const eventOrganize = fromHistoryOrganize(eventOrganizeData);
      expect(eventOrganize.key).toBe('role');
      expect(eventOrganize.value).toBe(HistoryOrganizeRole.PARTICIPANT);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        key: 'role',
        value: HistoryOrganizeRole.PARTICIPANT,
      })).toThrow('Invalid HistoryOrganize: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({ id: '1' })).toThrow('Invalid HistoryOrganize: historyId is required and must be a string');
      expect(() => fromHistoryOrganize({ id: '1', historyId: 'h1' })).toThrow('Invalid HistoryOrganize: organizeId is required and must be a string');
      expect(() => fromHistoryOrganize({ id: '1', historyId: 'h1', organizeId: 'o1' })).toThrow('Invalid HistoryOrganize: key is required and must be role, startAt or endAt');
    });
  });
});
