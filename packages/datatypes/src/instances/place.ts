import { createPlace, Place } from "../types/Place";
import { Story } from "../types/Story";
import { World } from "../types/World";
import { PlaceInstance } from "./PlaceInstance";

export function newPlace(story: Story, world: World, place: Parameters<typeof createPlace>[0]) {
  return new PlaceInstance(story, world, place);
}

export function loadPlace(story: Story, world: World, placeOrId: Place['id'] | Place) {
  return new PlaceInstance(story, world, placeOrId);
}
