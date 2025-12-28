import { describe, it, expect } from 'vitest';
import { createItemWorld, fromItemWorld, ItemWorldRole } from './ItemWorld';

describe('ItemWorld', () => {
  describe('createItemWorld', () => {
    it('应该创建一个带有ULID的ItemWorld对象', () => {
      const itemWorld = createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        role: ItemWorldRole.CREATOR,
      });

      expect(itemWorld).toBeDefined();
      expect(itemWorld.id).toBeDefined();
      expect(itemWorld.role).toBe(ItemWorldRole.CREATOR);
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemWorld({
        worldId: 'world_1',
        role: ItemWorldRole.CREATOR,
      } as any)).toThrow('Invalid ItemWorld: itemId is required and must be a string');
    });

    it('当缺少worldId时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        role: ItemWorldRole.CREATOR,
      } as any)).toThrow('Invalid ItemWorld: worldId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
      } as any)).toThrow('Invalid ItemWorld: role is required and must be a valid ItemWorldRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        role: 'invalid_role',
      } as any)).toThrow('Invalid ItemWorld: role is required and must be a valid ItemWorldRole');
    });
  });

  describe('fromItemWorld', () => {
    it('应该从对象创建ItemWorld对象', () => {
      const itemWorldData = {
        id: 'iw_123',
        itemId: 'item_1',
        worldId: 'world_1',
        role: ItemWorldRole.CREATOR,
      };

      const itemWorld = fromItemWorld(itemWorldData);
      expect(itemWorld.role).toBe(ItemWorldRole.CREATOR);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        role: ItemWorldRole.CREATOR,
      })).toThrow('Invalid ItemWorld: id is required and must be a string');
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => fromItemWorld({
        id: 'iw_123',
        worldId: 'world_1',
        role: ItemWorldRole.CREATOR,
      })).toThrow('Invalid ItemWorld: itemId is required and must be a string');
    });

    it('当缺少worldId时应该抛出错误', () => {
      expect(() => fromItemWorld({
        id: 'iw_123',
        itemId: 'item_1',
        role: ItemWorldRole.CREATOR,
      })).toThrow('Invalid ItemWorld: worldId is required and must be a string');
    });

    it('当缺少role时应该抛出错误', () => {
      expect(() => fromItemWorld({
        id: 'iw_123',
        itemId: 'item_1',
        worldId: 'world_1',
      })).toThrow('Invalid ItemWorld: role is required and must be a valid ItemWorldRole');
    });

    it('当role无效时应该抛出错误', () => {
      expect(() => fromItemWorld({
        id: 'iw_123',
        itemId: 'item_1',
        worldId: 'world_1',
        role: 'invalid_role',
      })).toThrow('Invalid ItemWorld: role is required and must be a valid ItemWorldRole');
    });
  });
});
