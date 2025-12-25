import { OrganizeInstance } from "./OrganizeInstance";
import { createOrganize } from "../types/Organize";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("OrganizeInstance", () => {
  it("should create an instance from an existing organize ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { organizes: [createOrganize({ name: "Test Organize" })] } });
    const instance = new OrganizeInstance(story, story.map.organizes[0].id);
    expect(instance.id).toBe(story.map.organizes[0].id);
  });

  it("should throw an error for an invalid organize ID", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: { organizes: [] } });
    expect(() => new OrganizeInstance(story, "invalid_id")).toThrow();
  });
});
