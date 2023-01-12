import React from "react"
import Space from "../Space/Space"
import View from "../View/View"

export interface FormHeader<T> {
  title?: string,
  index: keyof T & string,
  render?: (data: T | undefined, header: FormHeader<T>) => JSX.Element,
}

export interface FormProps<T extends object> {
  data: T | undefined,
  headers: FormHeader<T>[]
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
      return <Space.Vertical key={index}>
        <label>{header.title || header.index}</label>
        <View>{(header.render || defaultRender)(data, header)}</View>
      </Space.Vertical>
    })}
  </>
}

export default Form
