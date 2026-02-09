import { encode } from '@toon-format/toon'
import { createStory, fromStory, type Story } from '../types/Story';
import { match, P } from 'ts-pattern';
import { createWorld } from '../types/World';
import { createCalendar } from '../types/Calendar';
import { createWho } from '../types/Who';
import { createItem } from '../types/Item';
import { createOrganize } from '../types/Organize';
import { createHistory } from '../types/History';
import { loadWorld, newWorld } from './world';
import { loadOrganize, newOrganize } from './organize';
import { loadItem, newItem } from './item';
import { loadWho, newWho } from './who';
import { newCalendar } from './calendar';
import { newHistory } from './history';

export class StoryInstance {
  private story: Story;
  constructor(story: Story | Parameters<typeof createStory>[0]) {
    this.story = match(story)
      .with({ id: P.string }, (s) => {
        return fromStory(s);
      })
      .otherwise((data) => {
        return createStory(data);
      });
  }

  public get id () {
    return this.story.id;
  }

  public get name () {
    return this.story.name;
  }

  public set name (name: string) {
    this.story.name = name;
  }

  public get description () {
    return this.story.description ?? '';
  }

  public set description (description: string) {
    this.story.description = description;
  }

  public get summary () {
    return this.story.summary ?? '';
  }

  public set summary (summary: string) {
    this.story.summary = summary;
  }

  public get map () {
    return this.story.map;
  }

  public toObject() {
    return this.story
  }

  public toData() {
    const toon = encode(this.toObject(), {
      indent: 2,
      delimiter: ',',
      keyFolding: 'off',
      flattenDepth: Infinity
    })
    return toon
  }

  public listWorlds () {
    return this.story.map.world.map(w => loadWorld(this.story, w));
  }

  public listWhos() {
    return this.story.map.who.map(w => loadWho(this.story, w));
  }

  public listItems() {
    return this.story.map.items.map(i => loadItem(this.story, i));
  }

  public listOrganizes() {
    return this.story.map.organizes.map(o => loadOrganize(this.story, o));
  }

  public findWhoByName(name: string) {
    return this.listWhos().find(w => {
      const obj = w.toObject();
      return obj.name === name || obj.alias?.includes(name);
    });
  }

  public findItemByName(name: string) {
    return this.listItems().find(i => i.toObject().name === name);
  }

  public findOrganizeByName(name: string) {
    return this.listOrganizes().find(o => o.toObject().name === name);
  }

  public findWorldByName(name: string) {
    return this.listWorlds().find(w => w.toObject().name === name);
  }

  public appendWorld(...args: Parameters<typeof createWorld>) {
    const world = newWorld(this.story, ...args);
    return world;
  }

  public appendItem(item: Parameters<typeof createItem>[0]) {
    return newItem(this.story, item);
  }

  public appendOrganize(organize: Parameters<typeof createOrganize>[0]) {
    return newOrganize(this.story, organize);
  }

  public findOrganizeById(id: string) {
    const organizeData = this.story.map.organizes.find(o => o.id === id);
    if (!organizeData) {
      return null;
    }
    return loadOrganize(this.story, organizeData);
  }

  public removeOrganizeById (id: string) {
    const index = this.story.map.organizes.findIndex(o => o.id === id);
    if (index !== -1) {
      this.story.map.organizes.splice(index, 1);
    }
  }

  public listCalendars() {
    return this.story.map.calendars.map(c => newCalendar(this.story, c));
  }

  public appendCalendar(...args: Parameters<typeof createCalendar>) {
    const calendar = createCalendar(...args);
    this.story.map.calendars.push(calendar);

    return newCalendar(this.story, calendar)
  }

  public findCalendarById(id: string) {
    const calendarData = this.story.map.calendars.find(c => c.id === id);
    if (!calendarData) {
      return null;
    }
    return newCalendar(this.story, calendarData);
  }

  public removeCalendarById (id: string) {
    const index = this.story.map.calendars.findIndex(c => c.id === id);
    if (index !== -1) {
      this.story.map.calendars.splice(index, 1);
    }
  }

  public appendWho(who: Parameters<typeof createWho>[0]) {
    return newWho(this.story, who);
  }

  public appendHistory(history: Parameters<typeof createHistory>[0]) {
    return newHistory(this.story, history);
  }
}
