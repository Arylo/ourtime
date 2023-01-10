import { genBaseElement, BaseElement } from "./BaseElement";

export enum Direction {
  EAST, WEST, NORTH, SOUTH,
  EAST_NORTH,
  EAST_SOUTH,
  WEST_NORTH,
  WEST_SOUTH,
}

export interface BaseSite {
  name: string,
  site: [string, Direction][]
}

export interface Site extends BaseElement, BaseSite {}

export interface GenSiteOptions extends BaseSite { }

export const genSite = (options: GenSiteOptions): Site => {
  const elem = genBaseElement()
  return Object.assign(elem, options)
}
