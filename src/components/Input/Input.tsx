import { css } from '@stitches/react'
import React from 'react'
import parseClassNames from '../../utils/parseClassNames'
import parseProps from '../../utils/parseProps'
import { BaseProps } from '../Base'

export interface InputProps extends React.ComponentProps<'input'>, BaseProps {
  value?: any,
  block?: boolean
}

const DEFAULT_INPUT_PROPS: InputProps = {
  block: true,
}

const compStyles = {
  block: css({
    width: '100%',
  }),
}

export const Input: React.FC<InputProps> = (props) => {
  const { value, className, block, ...curProps } = parseProps(props, DEFAULT_INPUT_PROPS)
  const curValue = (() => {
    switch(typeof props.value) {
      case 'object': return JSON.stringify(props.value)
      default: return props.value
    }
  })()
  const curClassName = parseClassNames([
    className,
    block ? compStyles.block() : undefined,
  ])
  return <input {...curProps} className={curClassName} value={curValue} />
}

export default Input
