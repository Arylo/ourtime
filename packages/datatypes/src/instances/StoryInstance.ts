import { createStory, fromStory, type Story } from '../types/Story';
import { match, P } from 'ts-pattern';
import { createWorld } from '../types/World';
import { createCalendar } from '../types/Calendar';
import { createWho } from '../types/Who';
import { createItem } from '../types/Item';
import { createOrganize } from '../types/Organize';
import { loadWorld, newWorld } from './world';
import { newOrganize } from './organize';
import { newItem } from './item';
import { newWho } from './who';
import { newCalendar } from './calendar';

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

  public get description () {
    return this.story.description;
  }

  public get summary () {
    return this.story.summary;
  }

  public get map () {
    return this.story.map;
  }

  public toObject() {
    return this.story
  }
  public toJSON() {
    return JSON.stringify(this.toObject())
  }

  public listWorlds () {
    return this.story.map.world.map(w => loadWorld(this.story, w));
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

  public listCalendars() {
    return this.story.map.calendars.map(c => newCalendar(this.story, c));
  }

  public appendCalendar(...args: Parameters<typeof createCalendar>) {
    const calendar = createCalendar(...args);
    this.story.map.calendars.push(calendar);

    return newCalendar(this.story, calendar)
  }

  public appendWho(who: Parameters<typeof createWho>[0]) {
    return newWho(this.story, who);
  }
}
