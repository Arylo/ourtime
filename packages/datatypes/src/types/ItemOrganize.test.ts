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

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemOrganize({
        organizeId: 'org_1',
        role: ItemOrganizeRole.OWNER,
      } as any)).toThrow('Invalid ItemOrganize: itemId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        role: ItemOrganizeRole.OWNER,
      } as any)).toThrow('Invalid ItemOrganize: organizeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
      } as any)).toThrow('Invalid ItemOrganize: role is required and must be a valid ItemOrganizeRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid ItemOrganize: role is required and must be a valid ItemOrganizeRole');
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

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        role: ItemOrganizeRole.OWNER,
      })).toThrow('Invalid ItemOrganize: id is required and must be a string');
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        id: 'io_123',
        organizeId: 'org_1',
        role: ItemOrganizeRole.OWNER,
      })).toThrow('Invalid ItemOrganize: itemId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        id: 'io_123',
        itemId: 'item_1',
        role: ItemOrganizeRole.OWNER,
      })).toThrow('Invalid ItemOrganize: organizeId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        id: 'io_123',
        itemId: 'item_1',
        organizeId: 'org_1',
      })).toThrow('Invalid ItemOrganize: role is required and must be a valid ItemOrganizeRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        id: 'io_123',
        itemId: 'item_1',
        organizeId: 'org_1',
        role: 'invalid_role',
      })).toThrow('Invalid ItemOrganize: role is required and must be a valid ItemOrganizeRole');
    });
  });
});
