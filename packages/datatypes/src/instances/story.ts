import { createStory, fromStory } from "../types/Story";
import { StoryInstance } from "./StoryInstance";

export function newStory(...args: Parameters<typeof createStory>) {
  const instance = new StoryInstance(createStory(...args))
  const timeline = instance.appendWorld({ name: '故事世界' }).listTimelines()[0];

  const storyCalendar = instance.appendCalendar({
    name: '故事历',
    description: '故事世界的标准历法',
  });
  const startDate = timeline.genStoryDate({
    rangeStart: 0,
    rangeEnd: 0,
    calendarId: storyCalendar.id,
  });
  instance.appendSimpleTimelineHistory({
    name: '故事开始',
    date: startDate,
  })
  instance.appendWho({
    name: '主角',
    description: '故事的主角',
  })

  return instance;
}

export function loadStory(data: Record<string, any>) {
  const instance = new StoryInstance(fromStory(data));
  return instance;
}
