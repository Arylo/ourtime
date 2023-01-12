import React from 'react'
import { css } from '@stitches/react'
import Space from '../../components/Space/Space'
import WorldMenuButton from './WorldMenuButton'

const styles = {
  container: css({
    position: 'fixed',
    top: 0,
    right: 0,
  }),
}

const Menu = () => {
  return <Space.Vertical classNames={styles.container()}>
    <WorldMenuButton />
  </Space.Vertical>
}

export default Menu
