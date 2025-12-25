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
  });
});
