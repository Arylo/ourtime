import { Story } from "../types/Story";
import { createTimeline, Timeline } from "../types/Timeline";
import { World } from "../types/World";
import { TimelineInstance } from "./TimelineInstance";

export function newTimeline(story: Story, world: World, timeline: Parameters<typeof createTimeline>[0]) {
  return new TimelineInstance(story, world, timeline);
}

export function loadTimeline(story: Story, world: World, timelineOrId: Timeline['id'] | Timeline) {
  return new TimelineInstance(story, world, timelineOrId);
}
