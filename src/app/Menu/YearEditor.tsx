import React from 'react'
import { BaseYear } from '../../elements/Year'
import useWorld from '../../services/useWorld'
import { useYear } from '../../services/useYear'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Collapse from '../../components/Collapse/Collapse'
import Form, { FormHeader } from '../../components/Form/Form'

const YearEditor = () => {
  const [year, setYear] = React.useState<BaseYear>()
  const { list: worlds, findById: findWorldById } = useWorld()
  const { list: years, create: genYear } = useYear()
  const addHandle = () => {
    if (!year || !year.name) return
    if (!year.baseWorld && worlds.length === 1) {
      year.baseWorld = worlds[0].id
    }
    genYear(year)
    setYear(undefined)
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, key: string) => {
    setYear(Object.assign({}, year, {
      [key]: event.target.value,
    }))
  }

  const headers: FormHeader<BaseYear>[] = [{
    title: 'Name',
    index: 'name',
    render: (year, header) => {
      return (<Input
        value={year?.[header.index]}
        onChange={(event) => onChange(event, header.index)}
      />)
    },
  }, {
    title: 'Base World',
    index: 'baseWorld',
    render: (year, header) => {
      return (<select
        value={year?.baseWorld}
        onChange={(event) => onChange(event, header.index)}
      >
        {worlds.map((world) => <>
          <option value={world.id}>{world.name}</option>
        </>)}
      </select>)
    },
  }]

  return <Collapse title='Year'>
    {
      years.map((y) => {
        return <div key={y.id}>
          {`${y.name} By World ${findWorldById(y.baseWorld)?.name}`}
        </div>
      })
    }
    <div>
      <Form data={year} headers={headers}/>
      <Button onClick={addHandle}>+</Button>
    </div>
  </Collapse>
}

export default YearEditor
