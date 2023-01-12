import React from "react"
import parseClassNames from "./parseClassNames"
import parseStyles from "./parseStyle"

interface NewProps {
  style?: React.CSSProperties,
  styles?: React.CSSProperties | (React.CSSProperties | undefined)[],
  className?: string,
  classNames?: string | (string | undefined)[],
}

export const parseProps = <T extends NewProps = {}>(props: T, defaultValue?: T) => {
  const { style, styles = [], className = '', classNames = [], ...newProps } = Object.assign({}, defaultValue, props)
  const newStyle = parseStyles(styles, style)
  const newClaseName = parseClassNames(classNames, className)
  return { ...newProps, style: newStyle, className: newClaseName }
}

export default parseProps
