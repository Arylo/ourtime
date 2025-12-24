import {
  Story, loadStory, newStory,
} from '@ourtime/datatypes'

function get (key: string) {
  return localStorage.getItem(key)
}
function set (key: string, value: string) {
  localStorage.setItem(key, value)
}

function getJSONObject<D>(key: string) {
  return JSON.parse(get(key) as string) as D
}

function setJSONObject<D>(key: string, value: D) {
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('set JSON Object fail')
  }
  set(key, JSON.stringify(value))
}

function getJSONList<D> (key: string) {
  return JSON.parse(get(key) as string) as D[] ?? []
}

function setJSONList<D> (key: string, value: D[]) {
  if (!Array.isArray(value)) {
    throw new Error('set JSON List fail')
  }
  set(key, JSON.stringify(value))
}

export default {
  get,
  set,
  getJSONObject,
  setJSONObject,
  getJSONList,
  setJSONList,
}
