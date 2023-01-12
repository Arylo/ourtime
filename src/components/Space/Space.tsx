import { css } from "@stitches/react"
import React from "react"
import parseProps from "../../utils/parseProps"
import View, { ViewProps } from "../View/View"

export enum SPACE_MODE {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export interface SpaceProps extends ViewProps {
  mode?: SPACE_MODE,
}

const DEFAULT_SPACE_PROPS: SpaceProps = {
  mode: SPACE_MODE.VERTICAL,
}

const compStyles = {
  baseSpace: css({
    display: 'flex',
  }),
  verticalSpace: css({
    flexDirection: 'column',
  }),
  horizontalSpace: css({
    flexDirection: 'row',
  }),
}

export const Space: React.FC<SpaceProps> = (props) => {
  const { mode, className, ...curProps } = parseProps(props, DEFAULT_SPACE_PROPS)
  const modeClass = mode === SPACE_MODE.VERTICAL ? compStyles.verticalSpace() : compStyles.horizontalSpace()
  return <View classNames={[className, compStyles.baseSpace(), modeClass]} {...curProps} />
}

export const SpaceVertical: React.FC<SpaceProps> = (props) => <Space {...props} mode={SPACE_MODE.VERTICAL}  />

export const SpaceHorizontal: React.FC<SpaceProps> = (props) => <Space {...props} mode={SPACE_MODE.HORIZONTAL}  />

export default Object.assign(Space, { Vertical: SpaceVertical, Horizontal: SpaceHorizontal })
