import { genBaseElement, BaseElement } from "./BaseElement";

export interface BaseWorld {
  name: string,
}

export interface World extends BaseElement, BaseWorld {}

export interface GenWorldOptions extends BaseWorld { }

export const genWorld = (options: GenWorldOptions): World => {
  const elem = genBaseElement()
  return Object.assign(elem, options)
}
