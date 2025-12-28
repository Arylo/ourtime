import { describe, it, expect } from 'vitest';
import { createHistoryOrganize, fromHistoryOrganize, HistoryOrganizeRole } from './HistoryOrganize';

describe('HistoryOrganize', () => {
  describe('createHistoryOrganize', () => {
    it('应该创建一个带有ULID的HistoryOrganize对象', () => {
      const eventOrganize = createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      });

      expect(eventOrganize).toBeDefined();
      expect(eventOrganize.id).toBeDefined();
      expect(eventOrganize.role).toBe(HistoryOrganizeRole.PARTICIPANT);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryOrganize: historyId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryOrganize: organizeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
      } as any)).toThrow('Invalid HistoryOrganize: role is required and must be a valid HistoryOrganizeRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid HistoryOrganize: role is required and must be a valid HistoryOrganizeRole');
    });
  });

  describe('fromHistoryOrganize', () => {
    it('应该从对象创建HistoryOrganize对象', () => {
      const eventOrganizeData = {
        id: 'eo_123',
        historyId: 'history_1',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      };

      const eventOrganize = fromHistoryOrganize(eventOrganizeData);
      expect(eventOrganize.role).toBe(HistoryOrganizeRole.PARTICIPANT);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        historyId: 'history_1',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      })).toThrow('Invalid HistoryOrganize: id is required and must be a string');
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        id: 'eo_123',
        organizeId: 'org_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      })).toThrow('Invalid HistoryOrganize: historyId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        id: 'eo_123',
        historyId: 'history_1',
        role: HistoryOrganizeRole.PARTICIPANT,
      })).toThrow('Invalid HistoryOrganize: organizeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        id: 'eo_123',
        historyId: 'history_1',
        organizeId: 'org_1',
      })).toThrow('Invalid HistoryOrganize: role is required and must be a valid HistoryOrganizeRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromHistoryOrganize({
        id: 'eo_123',
        historyId: 'history_1',
        organizeId: 'org_1',
        role: 'invalid_role',
      })).toThrow('Invalid HistoryOrganize: role is required and must be a valid HistoryOrganizeRole');
    });
  });
});
