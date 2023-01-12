import React from 'react'
import DrawerButton from '../../components/Drawer/DrawerButton'
import Space from '../../components/Space/Space'
import WorldEditor from './WorldEditor'

const WorldMenuButton = () => {
  return <DrawerButton title='Worlds'>
    <Space.Vertical>
      <WorldEditor />
    </Space.Vertical>
  </DrawerButton>
}

export default WorldMenuButton
