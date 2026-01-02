import { OrganizeInstance } from "./OrganizeInstance";
import { createOrganize } from "../types/Organize";
import { Story } from "../types/Story";
import { describe, expect, it } from "vitest";
import { loadStory } from "./story";
import { createWho } from "../types/Who";
import { OrganizeWhoRole } from "../types/OrganizeWho";

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

  it("should invite and list whos", () => {
    const story: Story = loadStory({
      id: "story1",
      name: "Test Story",
      map: {
        organizes: [createOrganize({ name: "Test Organize" })],
        who: [createWho({ name: "Test Who" })]
      }
    });
    const instance = new OrganizeInstance(story, story.map.organizes[0].id);
    const who = story.map.who[0];

    instance.inviteWho(who.id, { role: OrganizeWhoRole.LEADER });

    const whos = instance.listWhos();
    expect(whos.length).toBe(1);
    expect(whos[0].id).toBe(who.id);

    const entries = story.map.organizeWho.filter(ow => ow.organizeId === instance.id && ow.whoId === who.id);
    expect(entries.length).toBe(1);
    expect(entries[0].key).toBe('role');
    expect(entries[0].value).toBe(OrganizeWhoRole.LEADER);
  });

  it("should change who role and dates", () => {
    const story: Story = loadStory({
      id: "story1",
      name: "Test Story",
      map: {
        organizes: [createOrganize({ name: "Test Organize" })],
        who: [createWho({ name: "Test Who" })]
      }
    });
    const instance = new OrganizeInstance(story, story.map.organizes[0].id);
    const who = story.map.who[0];

    instance.inviteWho(who.id);
    instance.changeWho(who.id, { role: OrganizeWhoRole.LEADER });

    const entries = story.map.organizeWho.filter(ow => ow.organizeId === instance.id && ow.whoId === who.id);
    const roleEntry = entries.find(e => e.key === 'role');
    expect(roleEntry?.value).toBe(OrganizeWhoRole.LEADER);
  });
});
