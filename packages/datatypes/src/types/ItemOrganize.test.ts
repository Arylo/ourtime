import { describe, it, expect } from 'vitest';
import { createItemOrganize, fromItemOrganize, ItemOrganizeRole } from './ItemOrganize';

describe('ItemOrganize', () => {
  describe('createItemOrganize', () => {
    it('应该创建一个带有ULID的ItemOrganize对象', () => {
      const itemOrganize = createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        role: ItemOrganizeRole.OWNER,
      });

      expect(itemOrganize).toBeDefined();
      expect(itemOrganize.id).toBeDefined();
      expect(itemOrganize.role).toBe(ItemOrganizeRole.OWNER);
    });
  });

  describe('fromItemOrganize', () => {
    it('应该从对象创建ItemOrganize对象', () => {
      const itemOrganizeData = {
        id: 'io_123',
        itemId: 'item_1',
        organizeId: 'org_1',
        role: ItemOrganizeRole.OWNER,
      };

      const itemOrganize = fromItemOrganize(itemOrganizeData);
      expect(itemOrganize.role).toBe(ItemOrganizeRole.OWNER);
    });
  });
});
