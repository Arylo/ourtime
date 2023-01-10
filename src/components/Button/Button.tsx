import React from "react";
import StyleSheet from "../../utils/StyleSheet";

const styles = {
  container: StyleSheet({
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
}

const Button = (props: React.ComponentProps<'a'>) => {
  const style = Object.assign({}, styles.container, props.style)
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url
    <a href="javascript:void(0);" {...props} style={style}>
      {props.children}
    </a>
  )
}

export default Button
