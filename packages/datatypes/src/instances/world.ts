import { Story } from "../types/Story";
import { createWorld, World } from "../types/World";
import { WorldInstance } from "./WorldInstance";

export function newWorld (story: Story, world: Parameters<typeof createWorld>[0]) {
  return new WorldInstance(story, world);
}

export function loadWorld (story: Story, worldOrId: string | World) {
  const worldInstance = new WorldInstance(story, worldOrId);
  return worldInstance;
}
