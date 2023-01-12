import React from 'react'
import { useStore } from '../../services/useStore'

const style: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
}

const PlayGround = () => {
  const [store] = useStore()
  return <div style={style}>
    {JSON.stringify(store, null, 2)}
  </div>
}

export default PlayGround
