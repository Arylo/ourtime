import OListItem from "@/components/O/OListItem";
import { InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import type { Calendar } from "@ourtime/datatypes";

export default function CalendarMonths ({ months, onValueChange }: { months: Calendar['months'], onValueChange: (months: Calendar['months']) => void }) {
  const onUpItem = (index: number) => {
    const data = [...months]
    const temp = data[index - 1]
    data[index - 1] = data[index]
    data[index] = temp
    onValueChange(data)
  }
  const onDownItem = (index: number) => {
    const data = [...months]
    const temp = data[index + 1]
    data[index + 1] = data[index]
    data[index] = temp
    onValueChange(data)
  }
  const onAddItem = (index: number) => {
    const data = [...months]
    data.splice(index + 1, 0, { name: '', days: 30 })
    onValueChange(data)
  }
  const onRemoveItem = (index: number) => {
    const data = [...months]
    data.splice(index, 1)
    onValueChange(data)
  }
  const onInputChange = (index: number, key: 'name' | 'days', value: string | number) => {
    const data = [...months]
    if (key === 'name') {
      data[index][key] = value as string
    } else {
      data[index][key] = value as number
    }
    onValueChange(data)
  }
  return <>
    <div className="flex flex-col">
      {
        months.map((month, index) => (<>
          <OListItem
            key={index}
            onUpItem={() => onUpItem(index)}
            disabledUpItem={index === 0}
            onDownItem={() => onDownItem(index)}
            disabledDownItem={index === months.length - 1}
            onAddItem={() => onAddItem(index)}
            onRemoveItem={() => onRemoveItem(index)}
            disabledRemoveItem={months.length === 1}
            blockStart={<InputGroupText className="font-mono">Month {index + 1}</InputGroupText>}
          >
            <div data-slot="input-group-control" className="flex flex-col w-full">
              <InputGroupInput
                className="min-h-[36px] leading-[32px]"
                placeholder={`Month ${index + 1}`}
                value={month.name}
                onChange={(e) => onInputChange(index, 'name', e.target.value)}
              />
              <div className="flex flex-row items-center pr-3">
                <InputGroupInput
                  type='number'
                  className="min-h-[36px] leading-[32px]"
                  placeholder="30"
                  value={month.days}
                  onChange={(e) => onInputChange(index, 'days', Number(e.target.value))}
                />
                <small>Day</small>
              </div>
            </div>
          </OListItem>
        </>
        ))
      }
    </div>
  </>
}
