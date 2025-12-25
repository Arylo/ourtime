import { createWho, Who } from "../types/Who";
import { Story } from "../types/Story";
import { WhoInstance } from "./WhoInstance";

export function newWho(story: Story, who: Parameters<typeof createWho>[0]) {
  return new WhoInstance(story, who);
}

export function loadWho(story: Story, whoOrId: Who['id'] | Who) {
  return new WhoInstance(story, whoOrId);
}
