import React from 'react'
import { useStore } from '../../services/useStore'

const style: React.CSSProperties = {
  height: '100vh',
  flexGrow: 1,
}

const PlayGround = () => {
  const [store] = useStore()
  return <div style={style}>
    {JSON.stringify(store.peoples, null, 2)}
    {JSON.stringify(store.worlds, null, 2)}
    {JSON.stringify(store.years, null, 2)}
  </div>
}

export default PlayGround
