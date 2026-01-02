import { describe, it, expect } from 'vitest';
import { createItemOrganize, fromItemOrganize, ItemOrganizeRole } from './ItemOrganize';
import { createStoryDate } from './StoryDate';

describe('ItemOrganize', () => {
  describe('createItemOrganize', () => {
    it('应该创建一个带有ULID的ItemOrganize对象', () => {
      const itemOrganize = createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        key: 'role',
        value: ItemOrganizeRole.OWNER,
      });

      expect(itemOrganize).toBeDefined();
      expect(itemOrganize.id).toBeDefined();
      expect(itemOrganize.key).toBe('role');
      expect(itemOrganize.value).toBe(ItemOrganizeRole.OWNER);
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemOrganize({
        organizeId: 'org_1',
        key: 'role',
        value: ItemOrganizeRole.OWNER,
      } as any)).toThrow('Invalid ItemOrganize: itemId is required and must be a string');
    });

    it('当缺少organizeId时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        key: 'role',
        value: ItemOrganizeRole.OWNER,
      } as any)).toThrow('Invalid ItemOrganize: organizeId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        value: ItemOrganizeRole.OWNER,
      } as any)).toThrow('Invalid ItemOrganize: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid ItemOrganize: role value must be a valid ItemOrganizeRole');
    });
  });

  describe('fromItemOrganize', () => {
    it('应该从对象创建ItemOrganize对象', () => {
      const itemOrganizeData = {
        id: 'io_123',
        itemId: 'item_1',
        organizeId: 'org_1',
        key: 'role',
        value: ItemOrganizeRole.OWNER,
      };

      const itemOrganize = fromItemOrganize(itemOrganizeData);
      expect(itemOrganize.key).toBe('role');
      expect(itemOrganize.value).toBe(ItemOrganizeRole.OWNER);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemOrganize({
        itemId: 'item_1',
        organizeId: 'org_1',
        key: 'role',
        value: ItemOrganizeRole.OWNER,
      })).toThrow('Invalid ItemOrganize: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromItemOrganize({ id: '1' })).toThrow('Invalid ItemOrganize: itemId is required and must be a string');
      expect(() => fromItemOrganize({ id: '1', itemId: 'i1' })).toThrow('Invalid ItemOrganize: organizeId is required and must be a string');
      expect(() => fromItemOrganize({ id: '1', itemId: 'i1', organizeId: 'o1' })).toThrow('Invalid ItemOrganize: key is required and must be role, startAt or endAt');
    });
  });
});
