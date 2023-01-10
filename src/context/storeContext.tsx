import React from 'react'
import { Store, store } from '../services/useStore';

export type State = Store
export type Dispatch = React.Dispatch<Partial<State>>

export const storeStateContext = React.createContext(store);
export const dispatchStateContext = React.createContext<Dispatch>(() => console.log('Invaild Action'));

export const StoreStateProvider = (props: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(
    (state: State, newValue: Partial<State>) => {
      return { ...state, ...newValue }
    },
    store
  );
  return (
    <storeStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {props.children}
      </dispatchStateContext.Provider>
    </storeStateContext.Provider>
  );
}
