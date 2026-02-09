import { describe, it, expect, beforeEach } from 'vitest';
import { getStoryIds } from './getStoryIds';

describe('storage', () => {
	beforeEach(() => {
		localStorage.clear();
		localStorage.setItem('stories', JSON.stringify([]));
	});

	describe('getStoryIds', () => {
		it('无任何 story 时返回空列表', () => {
			expect(getStoryIds()).toEqual([]);
		});

		it('返回已存在的 story id 列表', () => {
			const ids = ['a', 'b', 'c'];
			localStorage.setItem('stories', JSON.stringify(ids));
			expect(getStoryIds()).toEqual(ids);
		});
	});
});
