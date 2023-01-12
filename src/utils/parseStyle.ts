import React from "react"

export const parseStyles = <T extends React.CSSProperties>(styles: T | (T | undefined)[] = [], style?: T) => {
  return Object.assign({}, ...(Array.isArray(styles) ? styles : [styles]) , style)
}

export default parseStyles
