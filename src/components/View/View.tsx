import React from 'react'
import parseProps from '../../utils/parseProps'
import { BaseProps } from '../Base'

export interface ViewProps extends React.ComponentProps<'div'>, BaseProps {}

const View: React.FC<ViewProps> = (props) => {
  const curProps = parseProps(props)
  return <div {...curProps} />
}

export default View
