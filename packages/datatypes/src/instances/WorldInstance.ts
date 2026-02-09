import { match, P } from "ts-pattern";
import { Story } from "../types/Story";
import { createWorld, World } from "../types/World";
import { createTimeline } from "../types/Timeline";
import { createPlace, Place } from "../types/Place";
import { Who } from "../types/Who";
import { createWorldWho, WorldWhoRole } from "../types/WorldWho";
import { loadTimeline, newTimeline } from "./timeline";
import { loadPlace, newPlace } from "./place";

export class WorldInstance {
  private worldId: World['id'];

  public get id () {
    return this.worldId;
  }

  public getName () {
    return this.toObject().name;
  }

  public toObject () {
    return this.story.map.world.find(w => w.id === this.worldId)!;
  }

  constructor(private story: Story, worldOrId: World | World['id'] | Parameters<typeof createWorld>[0]) {
    this.worldId = match(worldOrId)
      .with(P.string, (id) => {
        const existingWorld = this.story.map.world.find(w => w.id === id);
        if (!existingWorld) {
          throw new Error(`World with id ${id} not found in story map`);
        }
        return existingWorld.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingWorld = this.story.map.world.find(w => w.id === id);
        if (!existingWorld) {
          throw new Error(`World with id ${id} not found in story map`);
        }
        return existingWorld.id;
      })
      .with({ name: P.string }, (data) => {
        const newWorld = createWorld(data);
        this.story.map.world.push(newWorld);
        return newWorld.id;
      })
      .otherwise(() => {
        throw new Error('Invalid worldOrId parameter');
      });
    if (this.listTimelines().length === 0) {
      const timelineName = this.story.map.world.length === 1 ? '主线' : '世界线';
      this.appendTimeline({ name: timelineName })
    }
  }

  public setOwner (whoOrIds: Who | Who['id'] | Who[] | Who['id'][]) {
    const whoIds = match(whoOrIds)
      .with(P.array({ id: P.string }), (whos) => whos.map(w => w.id))
      .with(P.array(P.string), (ids) => ids)
      .with({ id: P.string }, (who) => [who.id])
      .with(P.string, (id) => [id])
      .exhaustive();

    // 先移除已有的 owner 关系
    this.story.map.worldWho = this.story.map.worldWho
      .filter(ww => !(ww.worldId === this.id && ww.key === 'role' && ww.value === WorldWhoRole.OWNER));

    // 添加新的 owner 关系
    whoIds.forEach(whoId => {
      const worldWho = createWorldWho({
        worldId: this.id,
        whoId,
        key: 'role',
        value: WorldWhoRole.OWNER,
      });
      this.story.map.worldWho.push(worldWho);
    });
  }

  public appendSubWorld (world: Omit<Parameters<typeof createWorld>[0], 'parents'>) {
    return new WorldInstance(this.story, { ...world, parents: [this.id] });
  }

  public listTimelines () {
    return this.story.map.worldTimeline
      .filter(wt => wt.worldId === this.id)
      .map(wt => {
        const timeline = this.story.map.timeline.find(t => t.id === wt.timelineId);
        if (!timeline) {
          throw new Error(`Timeline with id ${wt.timelineId} not found in story map`);
        }
        return loadTimeline(this.story, this.toObject(), timeline);
      });
  }

  public appendTimeline (timeline: Parameters<typeof createTimeline>[0]) {
    return newTimeline(this.story, this.toObject(), timeline);
  }

  public listPlaces () {
    return this.story.map.worldPlace
      .filter(wp => wp.worldId === this.id)
      .map(wp => {
        const place = this.story.map.places.find(p => p.id === wp.placeId);
        if (!place) {
          throw new Error(`Place with id ${wp.placeId} not found in story map`);
        }
        return loadPlace(this.story, this.toObject(), place);
      });
  }

  public findPlaceByName (name: Place['name']) {
    return this.listPlaces().find(place => place.toObject().name === name);
  }

  public appendPlace (place: Parameters<typeof createPlace>[0]) {
    return newPlace(this.story, this.toObject(), place);
  }
}
