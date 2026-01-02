import { describe, it, expect } from 'vitest';
import {
  createHistoryWorldAffected,
  createHistoryOrganizeAffected,
  createHistoryWhoAffected,
  createHistoryPlaceAffected,
  createHistoryItemAffected,
  fromHistoryAffected,
  type HistoryAffected,
} from './HistoryAffected';

describe('HistoryAffected', () => {
  describe('create functions', () => {
    it('should create HistoryWorldAffected', () => {
      const data = {
        historyId: 'hist-123',
        worldId: 'world-123',
        data: {
          name: 'Updated World',
        },
      };
      const result = createHistoryWorldAffected(data);

      expect(result.id).toBeDefined();
      expect(result.historyId).toBe('hist-123');
      expect(result.entityType).toBe('world');
      expect(result.entityId).toBe('world-123');
      expect(result.data).toEqual(data.data);
    });

    it('should create HistoryOrganizeAffected', () => {
      const data = {
        historyId: 'hist-123',
        organizeId: 'org-123',
        data: {
          name: 'Updated Organization',
          departed: true,
        },
      };
      const result = createHistoryOrganizeAffected(data);

      expect(result.id).toBeDefined();
      expect(result.historyId).toBe('hist-123');
      expect(result.entityType).toBe('organize');
      expect(result.entityId).toBe('org-123');
      expect(result.data).toEqual(data.data);
    });

    it('should create HistoryWhoAffected', () => {
      const data = {
        historyId: 'hist-123',
        whoId: 'who-123',
        data: {
          name: 'Updated Person',
          alias: ['New Alias'],
        },
      };
      const result = createHistoryWhoAffected(data);

      expect(result.id).toBeDefined();
      expect(result.historyId).toBe('hist-123');
      expect(result.entityType).toBe('who');
      expect(result.entityId).toBe('who-123');
      expect(result.data).toEqual(data.data);
    });

    it('should create HistoryPlaceAffected', () => {
      const data = {
        historyId: 'hist-123',
        placeId: 'place-123',
        data: {
          name: 'Updated Place',
        },
      };
      const result = createHistoryPlaceAffected(data);

      expect(result.id).toBeDefined();
      expect(result.historyId).toBe('hist-123');
      expect(result.entityType).toBe('place');
      expect(result.entityId).toBe('place-123');
      expect(result.data).toEqual(data.data);
    });

    it('should create HistoryItemAffected', () => {
      const data = {
        historyId: 'hist-123',
        itemId: 'item-123',
        data: {
          name: 'Updated Item',
        },
      };
      const result = createHistoryItemAffected(data);

      expect(result.id).toBeDefined();
      expect(result.historyId).toBe('hist-123');
      expect(result.entityType).toBe('item');
      expect(result.entityId).toBe('item-123');
      expect(result.data).toEqual(data.data);
    });
  });

  describe('fromHistoryAffected', () => {
    it('should parse HistoryWorldAffected from object', () => {
      const original = createHistoryWorldAffected({
        historyId: 'hist-123',
        worldId: 'world-123',
        data: {
          name: 'Updated World',
        },
      });

      const parsed = fromHistoryAffected(original);

      expect(parsed).toEqual(original);
    });

    it('should parse HistoryOrganizeAffected from object', () => {
      const original = createHistoryOrganizeAffected({
        historyId: 'hist-123',
        organizeId: 'org-123',
        data: {
          name: 'Updated Organization',
        },
      });

      const parsed = fromHistoryAffected(original);

      expect(parsed).toEqual(original);
    });

    it('should throw error for invalid entityType', () => {
      const invalidData = {
        id: 'test-123',
        historyId: 'hist-123',
        entityType: 'invalid',
        entityId: 'entity-123',
        data: { name: 'Test' },
      };

      expect(() => fromHistoryAffected(invalidData)).toThrow('Invalid HistoryAffected: unknown entityType "invalid"');
    });

    it('should throw error for missing required fields', () => {
      expect(() => fromHistoryAffected({})).toThrow('Invalid HistoryAffected: id is required and must be a string');
    });
  });
});
