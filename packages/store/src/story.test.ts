import { describe, it, expect, beforeEach } from 'vitest';
import { getStory, saveStory, initStory } from './story';
import type { Story, StoryDataType } from '@ourtime/datatypes';
import { getStoryIds } from './getStoryIds';

describe('storage', () => {
	beforeEach(() => {
		localStorage.clear();
		localStorage.setItem('stories', JSON.stringify([]));
	});

	describe('initStory', () => {
		it('创建并返回一个带 id 的实例', () => {
			const s = initStory();
			expect(typeof s.id).toBe('string');
			expect(s.id.length).toBeGreaterThan(0);
		});

		it('写入 stories 列表', () => {
			const s = initStory();
			const ids = getStoryIds();
			expect(ids).toContain(s.id);
			expect(ids.length).toBe(1);
		});

	});

	describe('getStory', () => {
		it('能加载已存在的 story', () => {
			const created = initStory();
			const loaded = getStory(created.id);
			expect(loaded.id).toBe(created.id);
			expect(loaded.name).toBe(created.name);
			expect((loaded.map as StoryDataType)).toEqual(created.map);
		});

		it('不存在时抛错', () => {
			expect(() => getStory('not-exist')).toThrow('change storage fail');
		});
	});

	describe('saveStory', () => {
		it('更新 world 字段并可读取', () => {
			const s = initStory();
			const raw = s;
			raw.map.world = [{ id: 'w1', name: 'Updated World', startAt: { calendarId: 'test_calendar', rangeStart: 0, rangeEnd: 0 }, endAt: { calendarId: 'test_calendar', rangeStart: 1, rangeEnd: 1 } }];
			saveStory(s.id, raw);

			const loaded = getStory(s.id);
			const map = loaded.map as StoryDataType;
			expect(map.world.length).toBe(1);
			expect(map.world[0].name).toBe('Updated World');
		});

		it('可一次更新多个字段并完整替换', () => {
			const s = initStory();
			const raw = s;
			raw.map.world = [{ id: 'w2', name: 'World 2', startAt: { calendarId: 'test_calendar', rangeStart: 0, rangeEnd: 0 }, endAt: { calendarId: 'test_calendar', rangeStart: 1, rangeEnd: 1 } }];
			raw.map.timeline = [{ id: 't1', name: 'Main TL' }];
			raw.map.items = [{ id: 'i1', name: 'Item 1', description: 'Desc' }];
			saveStory(s.id, raw);

			const map = (getStory(s.id).map as StoryDataType);
			expect(map.world[0].id).toBe('w2');
			expect(map.timeline[0].id).toBe('t1');
			expect(map.items[0].id).toBe('i1');
		});
	});

	describe('多 story 场景', () => {
		it('多个 story 互不影响', () => {
			const s1 = initStory();
			const s2 = initStory();

			const r1 = s1;
			r1.map.world = [{ id: 'w1', name: 'World 1', startAt: { calendarId: 'test_calendar', rangeStart: 0, rangeEnd: 0 }, endAt: { calendarId: 'test_calendar', rangeStart: 1, rangeEnd: 1 } }];
			saveStory(s1.id, r1);

			const r2 = s2;
			r2.map.world = [{ id: 'w2', name: 'World 2', startAt: { calendarId: 'test_calendar', rangeStart: 0, rangeEnd: 0 }, endAt: { calendarId: 'test_calendar', rangeStart: 1, rangeEnd: 1 } }];
			saveStory(s2.id, r2);

			const l1 = getStory(s1.id);
			const l2 = getStory(s2.id);
			expect((l1.map as StoryDataType).world[0].name).toBe('World 1');
			expect((l2.map as StoryDataType).world[0].name).toBe('World 2');
		});
	});
});
