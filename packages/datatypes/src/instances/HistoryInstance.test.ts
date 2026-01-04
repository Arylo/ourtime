import { describe, it, expect } from 'vitest';
import { loadStory } from './story';
import { HistoryWhoRole } from '../types/HistoryWho';
import { HistoryPlaceRole } from '../types/HistoryPlace';
import { HistoryOrganizeRole } from '../types/HistoryOrganize';

describe('HistoryInstance', () => {
  it('should associate Who, Place, and Organize', () => {
    const story = loadStory({
      id: 'story1',
      name: 'Test Story',
      map: {
        Histories: [],
        who: [{ id: 'who1', name: 'Test Who' }],
        places: [{ id: 'place1', name: 'Test Place' }],
        organizes: [{ id: 'org1', name: 'Test Org' }],
        historyWho: [],
        historyPlace: [],
        historyOrganize: [],
        timeline: [],
        worldTimeline: [],
        world: [],
      }
    });

    const history = story.appendHistory({ name: 'Test Event' });

    history.associateWho('who1', { role: HistoryWhoRole.PARTICIPANT });
    history.associatePlace('place1', { role: HistoryPlaceRole.OCCURRED_IN });
    history.associateOrganize('org1', { role: HistoryOrganizeRole.PARTICIPANT });

    expect(story.map.historyWho.length).toBe(1);
    expect(story.map.historyWho[0].whoId).toBe('who1');
    expect(story.map.historyWho[0].value).toBe(HistoryWhoRole.PARTICIPANT);

    expect(story.map.historyPlace.length).toBe(1);
    expect(story.map.historyPlace[0].placeId).toBe('place1');
    expect(story.map.historyPlace[0].value).toBe(HistoryPlaceRole.OCCURRED_IN);

    expect(story.map.historyOrganize.length).toBe(1);
    expect(story.map.historyOrganize[0].organizeId).toBe('org1');
    expect(story.map.historyOrganize[0].value).toBe(HistoryOrganizeRole.PARTICIPANT);
  });

  it('should support manual association with startAt and endAt', () => {
    const story = loadStory({
      id: 'story1',
      name: 'Test Story',
      map: {
        Histories: [],
        who: [{ id: 'who1', name: 'Test Who' }],
        historyWho: [],
        timeline: [],
        worldTimeline: [],
        world: [],
      }
    });

    const history = story.appendHistory({ name: 'Test Event' });
    const startAt = { rangeStart: 100, rangeEnd: 100, calendarId: 'c1' };

    history.associateWho('who1', { startAt });

    expect(story.map.historyWho.length).toBe(1);
    expect(story.map.historyWho[0].key).toBe('startAt');
    expect(story.map.historyWho[0].value).toEqual(startAt);
  });
});
