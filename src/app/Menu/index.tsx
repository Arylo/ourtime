import React from 'react'
import Button from '../../components/Button/Button'
import StyleSheet from '../../utils/StyleSheet'
import WorldEditor from './WorldEditor'
import YearEditor from './YearEditor'

const styles = {
  addContainer: StyleSheet({
    position: 'fixed',
    top: 0,
    right: 0,
  }),
  menu: StyleSheet({
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    flexBasis: 300 - 40,
    flexShrink: 0,
    flexGrow: 0,
    boxShadow: '-5px 0px 30px #dedede',
  }),
}

const Menu = () => {
  const [showMenu, setShowMenu] = React.useState(false)
  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)
  return showMenu ? <div style={styles.menu}>
    <div>
      <WorldEditor />
      <YearEditor />
      <div><Button>Add People</Button></div>
    </div>
    <div>
      <Button onClick={closeMenu}>Cancel</Button>
    </div>
  </div> : <div style={styles.addContainer}>
    <Button onClick={openMenu}>+</Button>
  </div>
}

export default Menu
