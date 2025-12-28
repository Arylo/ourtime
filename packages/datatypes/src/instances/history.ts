import { createHistory, History } from "../types/History";
import { Story } from "../types/Story";
import { Timeline } from "../types/Timeline";
import { HistoryInstance } from "./HistoryInstance";

export function newHistory(story: Story, timeline: Timeline, history: Parameters<typeof createHistory>[0]) {
  return new HistoryInstance(story, timeline, history);
}

export function loadHistory(story: Story, timeline: Timeline, historyOrId: History['id'] | History) {
  return new HistoryInstance(story, timeline, historyOrId);
}
