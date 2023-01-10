import React from 'react'

export function Input(props: { value?: any, onChange?: (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => any }) {
  const curProps = {
    ...props,
    value: (() => {
      switch(typeof props.value) {
        case 'object': return JSON.stringify(props.value)
        default: return props.value
      }
    })(),
  }
  return <input {...curProps} />
}

export default Input
