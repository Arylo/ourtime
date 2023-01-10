import React from 'react'
import { BaseWorld } from '../../elements/World'
import useWorld from '../../services/useWorld'
import Button from '../../components/Button/Button'
import Collapse from '../../components/Collapse/Collapse'
import Form, { FormHeader } from '../../components/Form/Form'
import WorldItem from './WorldItem'

const WorldEditor = () => {
  const [world, setWorld] = React.useState<BaseWorld>()
  const { list: worlds, create: genWorld } = useWorld()
  const addWorld = () => {
    if (!world) return
    genWorld(world)
    setWorld(undefined)
  }
  const onChnage = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setWorld(Object.assign({}, world, { [key]: event.target.value }))
  }
  const headers: FormHeader<BaseWorld>[] = [{
    title: 'Name',
    index: 'name',
    render: (data, header) => {
      return <input value={data?.[header.index]} onChange={(event) => onChnage(event, header.index)} />
    }
  }]

  return <Collapse title='世界'>
    <div>
      <Form data={world} headers={headers} />
      <Button onClick={addWorld}>+</Button>
    </div>
    {
      worlds.map((world) => {
        return <WorldItem key={world.id} world={world} />
      })
    }
  </Collapse>
}

export default WorldEditor
