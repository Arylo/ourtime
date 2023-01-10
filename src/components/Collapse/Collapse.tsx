import React from "react";

const hrStyle: React.CSSProperties = {
  marginTop: 2,
  marginBottom: 2,
  width: '100%',
  height: 0,
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  borderBottomStyle: 'solid',
}

const Collapse = (props: React.ComponentProps<"div">) => {
  const [showMenu, setShowMenu] = React.useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  const { title } = props
  return <div>
    <div onClick={toggleMenu}>{title}</div>
    {showMenu ? <>
      <div style={hrStyle} />
      <div>{props.children}</div>
    </> : null}
  </div>
}

export default Collapse
