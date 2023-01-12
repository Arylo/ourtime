import { css } from "@stitches/react";
import React from "react";
import parseClassNames from "../../utils/parseClassNames";
import parseProps from "../../utils/parseProps";
import { BaseProps } from "../Base";

export interface ButtonProps extends React.ComponentProps<'a'>, BaseProps {
  block?: boolean,
}

const styles = {
  container: css({
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    textAlign: 'center',
  }),
  block: css({
    width: '100%',
  }),
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, block, ...curProps } = parseProps(props)
  const curClassName = parseClassNames([
    styles.container(),
    block ? styles.block() : undefined,
  ], className)
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" {...curProps} className={curClassName}>
      {props.children}
    </a>
  )
}

export default Button
