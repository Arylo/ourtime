import { describe, it, expect } from 'vitest';
import { createStory, fromStory } from './Story';

describe('Story entity', () => {
  it('createStory initializes all map collections as empty arrays', () => {
    const story = createStory({ name: 'demo' });
    const map = story.map as Record<string, unknown>;
    const arrayKeys = [
      'world', 'timeline', 'items', 'who', 'Histories', 'organizes', 'places', 'stories',
      'calendars', 'worldWho', 'worldTimeline', 'worldPlace', 'historyWho',
      'historyPlace', 'historyWorld', 'historyTimeline', 'historyOrganize', 'historyRelation',
      'organizePlace', 'itemWho', 'itemPlace', 'itemOrganize', 'itemWorld',
    ];

    arrayKeys.forEach(key => {
      expect(Array.isArray(map[key])).toBe(true);
      expect((map[key] as unknown[]).length).toBe(0);
    });
  });

  it('fromStory hydrates a valid story object', () => {
    const created = createStory({ name: 'demo' });
    const loaded = fromStory({
      id: created.id,
      name: created.name,
      description: created.description,
      summary: created.summary,
      map: created.map,
    });

    expect(loaded.id).toBe(created.id);
    expect(loaded.name).toBe('demo');
    expect(loaded.map).toBe(created.map);
  });

  it('fromStory throws when name missing', () => {
    expect(() => fromStory({ id: 'x', map: {} })).toThrow();
  });

  it('fromStory throws when id missing', () => {
    expect(() => fromStory({ name: 'demo', map: {} })).toThrow();
  });
});
