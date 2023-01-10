import { genBaseElement, BaseElement } from "./BaseElement";

export interface BaseYear {
  name: string,
  same?: [string, number][],
  baseWorld: string[],
}

export interface Year extends BaseElement, BaseYear { }

export interface GenYearOptions extends BaseYear { }

export const genYear = (options: GenYearOptions): Year => {
  const elem = genBaseElement()
  return Object.assign(elem, options)
}
