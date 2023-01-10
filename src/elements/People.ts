import { BaseElement, genBaseElement } from "./BaseElement";

export interface BasePeople {
  name: string
  from?: [string, number],
  to?: [string, number],
}

export interface People extends BaseElement, BasePeople { }

export interface GenPeopleOptions extends BasePeople {}

export const genPeople = (options: GenPeopleOptions): People => {
  const elem = genBaseElement()
  return Object.assign(elem, options)
}
