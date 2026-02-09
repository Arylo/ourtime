import type { createStory, Story } from "../types/Story";
import { StoryInstance } from "./StoryInstance";

export function newStory(...args: Parameters<typeof createStory>) {
  const instance = new StoryInstance(...args)
  // 创建一个默认的故事世界
  instance.appendWorld({ name: '故事世界', appeared: true });
  return instance;
}

export function loadStory<D extends Pick<Story, 'id' | 'name'>>(data: D) {
  const instance = new StoryInstance(data);
  return instance;
}
