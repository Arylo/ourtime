import { BaseElement, genBaseElement } from "./BaseElement";

export interface BaseHistory {
  name: string[]
  date: [string, number],
  before?: string,
  same?: string,
  who?: string[],
  site?: string,
}

export interface History extends BaseElement, BaseHistory { }

export interface GenHistoryOptions extends BaseHistory {}

export const genHistory = (options: GenHistoryOptions): History => {
  const elem = genBaseElement()
  return Object.assign(elem, options)
}
