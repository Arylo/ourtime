import { WorldInstance } from "./WorldInstance";
import { createWorld } from "../types/World";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory, newStory } from "./story";

describe("WorldInstance", () => {
  it("should throw an error for an invalid world ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { world: [] } });
    expect(() => new WorldInstance(story, "invalid_id")).toThrow();
  });
});
