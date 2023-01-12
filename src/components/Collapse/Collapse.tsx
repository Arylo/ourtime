import React, { PropsWithChildren } from "react";
import Hr from "../Hr/Hr";
import Space from "../Space/Space";
import View from "../View/View";

export interface CollapseProps extends PropsWithChildren {
  title: string,
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { title } = props
  const [showMenu, setShowMenu] = React.useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)
  return <Space.Vertical>
    <View onClick={toggleMenu}>{title}</View>
    {showMenu ? <>
      <Hr />
      <View>{props.children}</View>
    </> : null}
  </Space.Vertical>
}

export default Collapse
