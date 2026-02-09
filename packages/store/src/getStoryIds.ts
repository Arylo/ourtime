import storage from './storage'

export function getStoryIds() {
  return storage.getJSONList<string>('stories')
}
