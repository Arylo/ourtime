import { PlaceInstance } from "./PlaceInstance";
import { createPlace } from "../types/Place";
import { Story } from "../types/Story";
import { World } from "../types/World";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("PlaceInstance", () => {
  it("should create an instance from an existing place ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { places: [createPlace({ name: "Test Place" })], worldPlace: [] } });
    const world: World = { id: "world1", name: "Test World" };
    const instance = new PlaceInstance(story, world, story.map.places[0].id);
    expect(instance.id).toBe(story.map.places[0].id);
  });

  it("should throw an error for an invalid place ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { places: [], worldPlace: [] } });
    const world: World = { id: "world1", name: "Test World" };
    expect(() => new PlaceInstance(story, world, "invalid_id")).toThrow();
  });
});
