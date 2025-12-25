import { WhoInstance } from "./WhoInstance";
import { createWho } from "../types/Who";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("WhoInstance", () => {
  it("should create an instance from an existing who ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { who: [createWho({ name: "Test Who" })] } });
    const instance = new WhoInstance(story, story.map.who[0].id);
    expect(instance.id).toBe(story.map.who[0].id);
  });

  it("should throw an error for an invalid who ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { who: [] } });
    expect(() => new WhoInstance(story, "invalid_id")).toThrow();
  });
});
