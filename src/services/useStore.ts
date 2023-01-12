import { nanoid } from "nanoid"
import React from "react"
import { dispatchStateContext, storeStateContext } from "../context/storeContext"
import { Store } from "../elements/Store"

const worldId = nanoid()
export const store: Store = {
  peoples: [],
  worlds: [{
    id: worldId,
    name: '基轴世界',
  }],
  years: [{
    id: '123',
    name: 'AC',
    baseWorld: worldId,
  }],
}

export const useStore = () => [
  React.useContext(storeStateContext),
  React.useContext(dispatchStateContext)
] as [Store, React.Dispatch<Partial<Store>>];
