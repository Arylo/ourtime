import { createOrganize, Organize } from "../types/Organize";
import { Story } from "../types/Story";
import { OrganizeInstance } from "./OrganizeInstance";

export function newOrganize(story: Story, organize: Parameters<typeof createOrganize>[0]) {
  return new OrganizeInstance(story, organize);
}

export function loadOrganize(story: Story, organizeOrId: Organize['id'] | Organize) {
  return new OrganizeInstance(story, organizeOrId);
}
