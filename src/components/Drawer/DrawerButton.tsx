import { css } from '@stitches/react'
import React from 'react'
import Button from '../Button/Button'
import Space from '../Space/Space'
import View from '../View/View'
import Drawer from './Drawer'

export interface DrawerButtonProps extends React.PropsWithChildren {
  title: string,
  buttonClassName?: string,
  buttonClassNames?: string | (string | undefined)[],
  buttonStyle?: React.CSSProperties,
  buttonStyles?: React.CSSProperties | (React.CSSProperties | undefined)[],
  onOpen?: () => any,
  onClose?: () => any,
}

const compStyles = {
  container: css({
    justifyContent: 'space-between',
  }),
  content: css({
    flexGrow: 1,
  }),
  actions: css({
    flexGrow: 0,
    flexShrink: 0,
  })
}

export const DrawerButton: React.FC<DrawerButtonProps> = (props) => {
  const [showMenu, setShowMenu] = React.useState(false)
  const { title, buttonClassName, buttonClassNames, buttonStyle, buttonStyles, onOpen, onClose } = props
  return <>
    <Button
      className={buttonClassName}
      classNames={buttonClassNames}
      style={buttonStyle}
      styles={buttonStyles}
      onClick={() => setShowMenu(true)}
    >
      {title}
    </Button>
    <Drawer
      open={showMenu}
      onBgClick={() => setShowMenu(false)}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Space.Vertical classNames={compStyles.container()}>
        <View classNames={compStyles.content()}>
          {props.children}
        </View>
        <Space.Horizontal classNames={compStyles.actions()}>
          <Button block={true} onClick={() => setShowMenu(false)}>Cancel</Button>
        </Space.Horizontal>
      </Space.Vertical>
    </Drawer>
  </>
}

export default DrawerButton
