import { describe, it, expect } from 'vitest';
import { createHistoryWho, fromHistoryWho, HistoryWhoRole } from './HistoryWho';

describe('HistoryWho', () => {
  describe('createHistoryWho', () => {
    it('应该创建一个带有ULID的HistoryWho对象', () => {
      const eventWho = createHistoryWho({
        historyId: 'history_1',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      });

      expect(eventWho).toBeDefined();
      expect(eventWho.id).toBeDefined();
      expect(eventWho.role).toBe(HistoryWhoRole.PARTICIPANT);
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => createHistoryWho({
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryWho: historyId is required and must be a string');
    });

    it('当缺少whoId时应该抛出错误', () => {
      expect(() => createHistoryWho({
        historyId: 'history_1',
        role: HistoryWhoRole.PARTICIPANT,
      } as any)).toThrow('Invalid HistoryWho: whoId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createHistoryWho({
        historyId: 'history_1',
        whoId: 'who_1',
      } as any)).toThrow('Invalid HistoryWho: role is required and must be a valid HistoryWhoRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createHistoryWho({
        historyId: 'history_1',
        whoId: 'who_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid HistoryWho: role is required and must be a valid HistoryWhoRole');
    });
  });

  describe('fromHistoryWho', () => {
    it('应该从对象创建HistoryWho对象', () => {
      const eventWhoData = {
        id: 'ew_123',
        historyId: 'history_1',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      };

      const eventWho = fromHistoryWho(eventWhoData);
      expect(eventWho.role).toBe(HistoryWhoRole.PARTICIPANT);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromHistoryWho({
        historyId: 'history_1',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      })).toThrow('Invalid HistoryWho: id is required and must be a string');
    });

    it('当缺少historyId时应该抛出错误', () => {
      expect(() => fromHistoryWho({
        id: 'ew_123',
        whoId: 'who_1',
        role: HistoryWhoRole.PARTICIPANT,
      })).toThrow('Invalid HistoryWho: historyId is required and must be a string');
    });

    it('当缺少whoId时应该抛出错误', () => {
      expect(() => fromHistoryWho({
        id: 'ew_123',
        historyId: 'history_1',
        role: HistoryWhoRole.PARTICIPANT,
      })).toThrow('Invalid HistoryWho: whoId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromHistoryWho({
        id: 'ew_123',
        historyId: 'history_1',
        whoId: 'who_1',
      })).toThrow('Invalid HistoryWho: role is required and must be a valid HistoryWhoRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromHistoryWho({
        id: 'ew_123',
        historyId: 'history_1',
        whoId: 'who_1',
        role: 'invalid_role',
      })).toThrow('Invalid HistoryWho: role is required and must be a valid HistoryWhoRole');
    });
  });
});
