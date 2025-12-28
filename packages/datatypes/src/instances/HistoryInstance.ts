import { match, P } from "ts-pattern";
import { createHistory, History } from "../types/History";
import { Story } from "../types/Story";
import { Timeline } from "../types/Timeline";
import { createHistoryTimeline, HistoryTimelineRole } from "../types/HistoryTimeline";
import type { TimelineInstance } from "./TimelineInstance";

export class HistoryInstance {
  private historyId: History['id'];

  public get id() {
    return this.historyId;
  }

  public toObject() {
    return this.story.map.Histories.find(h => h.id === this.historyId)!;
  }

  constructor(private story: Story, private timeline: Timeline, historyOrId: History['id'] | Parameters<typeof createHistory>[0] | History) {
    this.historyId = match(historyOrId)
      .with(P.string, (id) => {
        const existingHistory = this.story.map.Histories.find(h => h.id === id);
        if (!existingHistory) {
          throw new Error(`History with id ${id} not found in story map`);
        }
        return existingHistory.id;
      })
      .with({ id: P.string }, ({ id }) => {
        const existingHistory = this.story.map.Histories.find(h => h.id === id);
        if (!existingHistory) {
          throw new Error(`History with id ${id} not found in story map`);
        }
        return existingHistory.id;
      })
      .with({ name: P.string }, (data) => {
        const newHistory = createHistory(data);
        this.story.map.Histories.push(newHistory);
        return newHistory.id;
      })
      .otherwise(() => {
        throw new Error('Invalid historyOrId parameter');
      });

    const exist = this.story.map.historyTimeline.find(ht => ht.historyId === this.id && ht.timelineId === this.timeline.id);
    if (!exist) {
      this.associateTimeline(this.timeline.id);
    }
  }

  // 关联时间线
  public associateTimeline(timelineOrId: Timeline | Timeline['id'] | TimelineInstance) {
    const timelineId = match(timelineOrId)
      .with({ id: P.string }, ({ id }) => id)
      .with(P.string, (id) => id)
      .exhaustive();

    const existingTimeline = this.story.map.timeline.find(t => t.id === timelineId);
    if (!existingTimeline) {
      throw new Error(`Timeline with id ${timelineId} not found in story map`);
    }

    // 添加新的关联
    this.story.map.historyTimeline.push(createHistoryTimeline({
      historyId: this.id,
      timelineId: timelineId,
      role: HistoryTimelineRole.OCCURRED_IN,
    }));

    return this
  }
}
