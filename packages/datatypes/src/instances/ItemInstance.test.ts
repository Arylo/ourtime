import { ItemInstance } from "./ItemInstance";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("ItemInstance", () => {
  it("should throw an error for an invalid item ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { items: [] } });
    expect(() => new ItemInstance(story, "invalid_id")).toThrow();
  });
});
