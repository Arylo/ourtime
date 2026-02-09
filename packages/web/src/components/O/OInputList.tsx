import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { InputGroupInput } from "../ui/input-group";
import OListItem from "./OListItem";

interface OInputListProps extends Omit<React.ComponentProps<typeof Input>, 'value'> {
  value: string[],
  onValueChange?: (value: string[]) => void;
}

export default function OInputList(props: OInputListProps) {
  const [editValue, setEditValue] = useState(props.value)
  const refreshValue = () => {
    setEditValue([...editValue])
    props.onValueChange?.(editValue)
  }
  useEffect(() => {
    if (!props.value.length) {
      props.onValueChange?.([''])
    }
  }, [])
  useEffect(() => {
    setEditValue(props.value)
  }, [props.value])
  const onChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    editValue[index] = e.target.value
    refreshValue()
    return props.onChange?.(e)
  }, [props])
  const upItem = (index: number) => {
    const temp = editValue[index - 1]
    editValue[index - 1] = editValue[index]
    editValue[index] = temp
    refreshValue()
  }
  const downItem = (index: number) => {
    const temp = editValue[index + 1]
    editValue[index + 1] = editValue[index]
    editValue[index] = temp
    refreshValue()
  }
  const addItem = (index: number) => {
    editValue.splice(index + 1, 0, '')
    refreshValue()
  }
  const removeItem = (index: number) => {
    if (editValue.length <= 1) {
      editValue[0] = ''
    } else {
      editValue.splice(index, 1)
    }
    refreshValue()
  }
  return <div className="flex flex-col">
    {
      editValue.map((val, index) => (<>
        <OListItem
          key={index}
          onUpItem={() => upItem(index)}
          disabledUpItem={index === 0}
          onDownItem={() => downItem(index)}
          disabledDownItem={index === editValue.length - 1}
          onAddItem={() => addItem(index)}
          onRemoveItem={() => removeItem(index)}
        >
          <InputGroupInput value={val} onChange={(e) => onChange(index, e)}/>
        </OListItem>
      </>))
    }
  </div>;
}
