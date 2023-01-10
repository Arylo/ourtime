import { People } from "../elements/People"
import { World } from "../elements/World"
import { Year } from "../elements/Year"

export interface Store {
  peoples: People[],
  worlds: World[],
  years: Year[],
}

const store: Store = {
  peoples: [],
  worlds: [],
  years: [],
}

export const useStore = () => store
