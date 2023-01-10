import { nanoid } from 'nanoid'

export interface BaseElement {
  id: string,
}

export const genBaseElement = (): BaseElement => {
  return {
    id: nanoid(),
  }
}
