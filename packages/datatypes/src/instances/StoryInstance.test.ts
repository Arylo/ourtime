import { StoryInstance } from "./StoryInstance";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("StoryInstance", () => {
  it("should create an instance and expose story properties", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", description: "A test story", summary: "Summary", map: {} });
    const instance = new StoryInstance(story);
    expect(instance.id).toBe(story.id);
    expect(instance.name).toBe(story.name);
    expect(instance.description).toBe(story.description);
    expect(instance.summary).toBe(story.summary);
  });
});
