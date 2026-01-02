import { describe, it, expect } from 'vitest';
import { createItemWorld, fromItemWorld, ItemWorldRole } from './ItemWorld';
import { createStoryDate } from './StoryDate';

describe('ItemWorld', () => {
  describe('createItemWorld', () => {
    it('应该创建一个带有ULID的ItemWorld对象', () => {
      const itemWorld = createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        key: 'role',
        value: ItemWorldRole.CREATOR,
      });

      expect(itemWorld).toBeDefined();
      expect(itemWorld.id).toBeDefined();
      expect(itemWorld.key).toBe('role');
      expect(itemWorld.value).toBe(ItemWorldRole.CREATOR);
    });

    it('当缺少itemId时应该抛出错误', () => {
      expect(() => createItemWorld({
        worldId: 'world_1',
        key: 'role',
        value: ItemWorldRole.CREATOR,
      } as any)).toThrow('Invalid ItemWorld: itemId is required and must be a string');
    });

    it('当缺少worldId时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        key: 'role',
        value: ItemWorldRole.CREATOR,
      } as any)).toThrow('Invalid ItemWorld: worldId is required and must be a string');
    });

    it('当缺少key时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        value: ItemWorldRole.CREATOR,
      } as any)).toThrow('Invalid ItemWorld: key is required and must be role, startAt or endAt');
    });

    it('当role值无效时应该抛出错误', () => {
      expect(() => createItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        key: 'role',
        value: 'invalid_role',
      } as any)).toThrow('Invalid ItemWorld: role value must be a valid ItemWorldRole');
    });
  });

  describe('fromItemWorld', () => {
    it('应该从对象创建ItemWorld对象', () => {
      const itemWorldData = {
        id: 'iw_123',
        itemId: 'item_1',
        worldId: 'world_1',
        key: 'role',
        value: ItemWorldRole.CREATOR,
      };

      const itemWorld = fromItemWorld(itemWorldData);
      expect(itemWorld.key).toBe('role');
      expect(itemWorld.value).toBe(ItemWorldRole.CREATOR);
    });

    it('当缺少id时应该抛出错误', () => {
      expect(() => fromItemWorld({
        itemId: 'item_1',
        worldId: 'world_1',
        key: 'role',
        value: ItemWorldRole.CREATOR,
      })).toThrow('Invalid ItemWorld: id is required and must be a string');
    });

    it('当缺少必要字段时应该抛出错误', () => {
      expect(() => fromItemWorld({ id: '1' })).toThrow('Invalid ItemWorld: itemId is required and must be a string');
      expect(() => fromItemWorld({ id: '1', itemId: 'i1' })).toThrow('Invalid ItemWorld: worldId is required and must be a string');
      expect(() => fromItemWorld({ id: '1', itemId: 'i1', worldId: 'w1' })).toThrow('Invalid ItemWorld: key is required and must be role, startAt or endAt');
    });
  });
});
