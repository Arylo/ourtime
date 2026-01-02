import { StoryInstance } from "./StoryInstance";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";

describe("StoryInstance", () => {
  it("should create an instance and expose story properties", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", description: "A test story", summary: "Summary", map: {} });
    const instance = new StoryInstance(story);
    expect(instance.id).toBe(story.id);
    expect(instance.name).toBe(story.name);
    expect(instance.description).toBe(story.description);
    expect(instance.summary).toBe(story.summary);
  });

  it("should list and find entities by name", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: {} });
    const instance = new StoryInstance(story);

    instance.appendWho({ name: "Alice" });
    instance.appendItem({ name: "Sword" });
    instance.appendOrganize({ name: "Guild" });
    instance.appendWorld({ name: "Earth" });

    expect(instance.listWhos().length).toBe(1);
    expect(instance.listWhos()[0].toObject().name).toBe("Alice");
    expect(instance.findWhoByName("Alice")?.toObject().name).toBe("Alice");

    expect(instance.listItems().length).toBe(1);
    expect(instance.listItems()[0].toObject().name).toBe("Sword");
    expect(instance.findItemByName("Sword")?.toObject().name).toBe("Sword");

    expect(instance.listOrganizes().length).toBe(1);
    expect(instance.listOrganizes()[0].toObject().name).toBe("Guild");
    expect(instance.findOrganizeByName("Guild")?.toObject().name).toBe("Guild");

    expect(instance.listWorlds().length).toBe(1);
    expect(instance.listWorlds()[0].toObject().name).toBe("Earth");
    expect(instance.findWorldByName("Earth")?.toObject().name).toBe("Earth");
  });

  it("should find entities by alias", () => {
    const story: Story = loadStory({ id: "story1", name: "Test Story", map: {} });
    const instance = new StoryInstance(story);

    instance.appendWho({ name: "Alice", alias: ["Ally"] });

    expect(instance.findWhoByName("Ally")?.toObject().name).toBe("Alice");
  });
});
