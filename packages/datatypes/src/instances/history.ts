import { createHistory, History } from "../types/History";
import { Story } from "../types/Story";
import { HistoryInstance } from "./HistoryInstance";

export function newHistory(story: Story, history: Parameters<typeof createHistory>[0]) {
  return new HistoryInstance(story, history);
}

export function loadHistory(story: Story, historyOrId: History['id'] | History) {
  return new HistoryInstance(story, historyOrId);
}
