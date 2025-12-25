import { TimelineInstance } from "./TimelineInstance";
import { createTimeline } from "../types/Timeline";
import { Story } from "../types/Story";
import { World } from "../types/World";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("TimelineInstance", () => {
  it("should create an instance from an existing timeline ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { timeline: [createTimeline({ name: "Test Timeline" })], worldTimeline: [] } });
    const world: World = { id: "world1", name: "Test World" };
    const instance = new TimelineInstance(story, world, story.map.timeline[0].id);
    expect(instance.id).toBe(story.map.timeline[0].id);
  });

  it("should throw an error for an invalid timeline ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { timeline: [], worldTimeline: [] } });
    const world: World = { id: "world1", name: "Test World" };
    expect(() => new TimelineInstance(story, world, "invalid_id")).toThrow();
  });
});
