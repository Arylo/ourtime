import React from "react"
import { dispatchStateContext, storeStateContext } from "../context/storeContext"
import { People } from "../elements/People"
import { World } from "../elements/World"
import { Year } from "../elements/Year"

export interface Store {
  peoples: People[],
  worlds: World[],
  years: Year[],
}

export const store: Store = {
  peoples: [],
  worlds: [],
  years: [],
}

export const useStore = () => [
  React.useContext(storeStateContext),
  React.useContext(dispatchStateContext)
] as [Store, React.Dispatch<Partial<Store>>];
