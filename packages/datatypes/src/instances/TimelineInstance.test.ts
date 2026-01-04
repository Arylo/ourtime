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

  it("should append history without automatic association", () => {
    const story = loadStory({ id: "story1", name: "Test Story", map: { timeline: [createTimeline({ name: "Test Timeline" })], worldTimeline: [], Histories: [], historyTimeline: [] } });
    const world: World = { id: "world1", name: "Test World" };
    const instance = new TimelineInstance(story.toObject(), world, story.map.timeline[0].id);

    const history = story.appendHistory({ name: "Test Event" });
    expect(history).toBeDefined();
    expect(story.map.Histories.length).toBe(1);
    // Should not be automatically associated
    expect(story.map.historyTimeline.length).toBe(0);
  });

  it("should support manual association with role, startAt, and endAt", () => {
    const story = loadStory({ id: "story1", name: "Test Story", map: { timeline: [createTimeline({ name: "Test Timeline" })], worldTimeline: [], Histories: [], historyTimeline: [] } });
    const world: World = { id: "world1", name: "Test World" };
    const instance = new TimelineInstance(story.toObject(), world, story.map.timeline[0].id);

    const history = story.appendHistory({ name: "Test Event" });
    const startAt = instance.genStoryDate({ rangeStart: 100, rangeEnd: 100, calendarId: 'c1' });

    history.associateTimeline(instance.id, { startAt });

    expect(story.map.historyTimeline.length).toBe(1);
    expect(story.map.historyTimeline[0].key).toBe('startAt');
    expect(story.map.historyTimeline[0].value).toEqual(startAt);
  });
});
