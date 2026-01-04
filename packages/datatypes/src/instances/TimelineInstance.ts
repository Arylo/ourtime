import { match, P } from "ts-pattern";
import { Story } from "../types/Story";
import { createTimeline, Timeline } from "../types/Timeline";
import { World } from "../types/World";
import { createWorldTimeline } from "../types/WorldTimeline";
import { createStoryDate, StoryDate } from "../types/StoryDate";

export class TimelineInstance {
  private timelineId: Timeline['id']

  public get id () {
    return this.timelineId;
  }
  public toObject () {
    return this.story.map.timeline.find(t => t.id === this.timelineId)!;
  }

  constructor(private story: Story, private world: World, timelineOrId: Timeline['id'] | Parameters<typeof createTimeline>[0] | Timeline) {
    this.timelineId = match(timelineOrId)
      .with(P.string, (id) => {
        const existingTimeline = this.story.map.timeline.find(t => t.id === id);
        if (!existingTimeline) {
          throw new Error(`Timeline with id ${id} not found in story map`);
        }
        return existingTimeline.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingTimeline = this.story.map.timeline.find(t => t.id === id);
        if (!existingTimeline) {
          throw new Error(`Timeline with id ${id} not found in story map`);
        }
        return existingTimeline.id;
      })
      .with({ name: P.string }, (data) => {
        const newTimeline = createTimeline(data);
        this.story.map.timeline.push(newTimeline);
        const worldTimeline = createWorldTimeline({
          worldId: this.world.id,
          timelineId: newTimeline.id,
        });
        this.story.map.worldTimeline.push(worldTimeline);
        return newTimeline.id;
      })
      .otherwise(() => {
        throw new Error('Invalid timelineOrId parameter');
      });
  }

  public fork (data: Omit<Parameters<typeof createTimeline>[0], 'baseOn'> & Required<Pick<Parameters<typeof createTimeline>[0], 'baseAt'>>) {
    return new TimelineInstance(this.story, this.world, {
      ...data,
      baseOn: this.id,
      speed: data.speed ?? this.toObject().speed,
    })
  }

  public genStoryDate<
    P extends Parameters<typeof createStoryDate>[0]
  >(options: P) {
    return createStoryDate(options);
  }
}
