import React from "react"
import StyleSheet from "../../utils/StyleSheet"

export interface FormHeader<T> {
  title?: string,
  index: keyof T & string,
  render?: (data: T | undefined, header: FormHeader<T>) => JSX.Element,
}

export interface FormProps<T extends object> {
  data: T | undefined,
  headers: FormHeader<T>[]
}

const styles = {
  container: StyleSheet({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }),
  label: StyleSheet({
    flexBasis: 65,
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: 5,
    textAlign: 'right',
    alignSelf: 'center',
  }),
  value: StyleSheet({
    flexGrow: 1
  }),
}

function Form<T extends object>(opts: FormProps<T>) {
  const { data, headers } = opts
  const defaultRender = (data: T | undefined, header: FormHeader<T>) => {
    if (!data) return data
    switch (typeof data) {
      case 'object':
        return JSON.stringify(data[header.index])
      default:
        return data[header.index]
    }
  }
  return <>
    {headers.map((header, index) => {
      return <div key={index} style={styles.container}>
        <label style={styles.label}>{header.title || header.index}</label>
        <div style={styles.value}>{(header.render || defaultRender)(data, header)}</div>
      </div>
    })}
  </>
}

export default Form
