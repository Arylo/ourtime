import { css } from "@stitches/react"
import React from "react"
import View from "../View/View"

const hrStyle = css({
  marginTop: 2,
  marginBottom: 2,
  width: '100%',
  height: 0,
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  borderBottomStyle: 'solid',
})

export const Hr = () => <View className={hrStyle()} />

export default Hr
