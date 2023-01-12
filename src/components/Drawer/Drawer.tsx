import { css } from '@stitches/react'
import React, { PropsWithChildren } from 'react'
import View from '../View/View'

export interface DrawerProps extends PropsWithChildren {
  open: boolean,
  onOpen?: () => any,
  onClose?: () => any,
  onBgClick?: () => any,
}

const styles = {
  background: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#b6b6b666',
  }),
  menuContainer: css({
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    maxWidth: 300,
    width: 300,
    minWidth: 300,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    boxShadow: '-5px 0px 30px #b6b6b6',
  }),
}

const noop = () => {}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { open, onOpen = noop, onClose = noop, onBgClick = noop } = props
  React.useEffect(() => {
    (open ? onOpen : onClose)()
  }, [open, onOpen, onClose])
  return open ? <>
    <View className={styles.background()} onClick={onBgClick} />
    <View className={styles.menuContainer()}>
      {props.children}
    </View>
  </> : null
}

export default Drawer
