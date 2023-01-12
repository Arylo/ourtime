import { css } from '@stitches/react'
import React from 'react'
import parseProps from '../../utils/parseProps'
import View, { ViewProps } from './View'

export type ZoneProps = ViewProps

const compStyles = {
  container: css({
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 5,
  }),
}

const Zone: React.FC<ZoneProps> = (props) => {
  const { className, ...curProps } = parseProps(props)
  return <View {...curProps} classNames={[compStyles.container(), className]} />
}

export default Zone
