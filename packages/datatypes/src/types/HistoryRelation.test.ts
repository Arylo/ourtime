import { describe, it, expect } from 'vitest';
import { createHistoryRelation, fromHistoryRelation, HistoryRelationType } from './HistoryRelation';
import { createStoryDate } from './StoryDate';
import { createStory } from './Story';

describe('HistoryRelation', () => {
  it('should create a relation with optional date value', () => {
    const date = createStoryDate({ rangeStart: 0, rangeEnd: 0, calendarId: 'cal1' });
    const relation = createHistoryRelation({
      fromHistoryId: 'e1',
      toHistoryId: 'e2',
      type: HistoryRelationType.BEFORE,
      value: date,
    });

    expect(relation.fromHistoryId).toBe('e1');
    expect(relation.toHistoryId).toBe('e2');
    expect(relation.type).toBe(HistoryRelationType.BEFORE);
    expect(relation.value).toEqual(date);
  });

  it('should deserialize with fromHistoryRelation and parse date', () => {
    const relation = fromHistoryRelation({
      fromHistoryId: 'e1',
      toHistoryId: 'e2',
      type: HistoryRelationType.AFTER,
      value: { id: 'sd1', rangeStart: 1, rangeEnd: 2, calendarId: 'cal1' },
    });

    expect(relation.type).toBe(HistoryRelationType.AFTER);
    expect(relation.value?.rangeStart).toBe(1);
    expect(relation.value?.rangeEnd).toBe(2);
  });

  it('should throw when required fields are missing', () => {
    expect(() => fromHistoryRelation({ toHistoryId: 'e2', type: HistoryRelationType.SAME })).toThrow();
    expect(() => fromHistoryRelation({ fromHistoryId: 'e1', type: HistoryRelationType.SAME })).toThrow();
    expect(() => fromHistoryRelation({ fromHistoryId: 'e1', toHistoryId: 'e2', type: 'INVALID' })).toThrow();
  });
});

describe('Story.map historyRelation', () => {
  it('should initialize historyRelation as empty array', () => {
    const story = createStory({ name: 'test story' });
    expect(Array.isArray(story.map.historyRelation)).toBe(true);
    expect(story.map.historyRelation.length).toBe(0);
  });
});
