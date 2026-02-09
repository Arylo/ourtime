import { loadStory, newStory, Story, StoryInstance } from '@ourtime/datatypes'
import storage from './storage'

function getStoryIds() {
  return storage.getJSONList<string>('stories')
}

export function getStory (id: string): ReturnType<typeof loadStory> {
  const storyIds = storage.getJSONObject<string[]>('stories') ?? []
  if (!storyIds.includes(id)) {
    throw new Error('change storage fail')
  }
  return loadStory(storage.getJSONObject(`story-${id}`) as any)
}

export function saveStory (id: string, value: StoryInstance) {
  storage.setJSONObject(`story-${id}`, value.toObject())
}

export function initStory(): ReturnType<typeof newStory> {
  const story = newStory({ name: '新故事' })
  const id = story.id
  const storyIds = getStoryIds()
  storyIds.push(id)
  storage.setJSONList('stories', storyIds)
  saveStory(id, story)
  return story
}
