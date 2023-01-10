import React from 'react'
import Button from '../../components/Button/Button'
import Form, { FormHeader } from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import { World } from '../../elements/World'
import useWorld from '../../services/useWorld'
import StyleSheet from '../../utils/StyleSheet'

const styles = {
  editContainer: StyleSheet({
    padding: 5,
    border: 'black 1px solid',
  }),
  btns: StyleSheet({
    display: 'flex',
    flexDirection: 'row',
  }),
  viewContainer: StyleSheet({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    border: 'black 1px solid',
  }),
  editBtn: StyleSheet({
    height: 20,
    width: 50,
    minWidth: 50,
  }),
}

const WorldItem: React.FC<{ world: World }> = ({ world }) => {
  const [isEdit, setEdit] = React.useState(false)
  const { findById } = useWorld()
  if (!isEdit) {
    return <div style={styles.viewContainer}>
      <span>{world.name}</span>
      <Button style={styles.editBtn} onClick={() => setEdit(true)}>Edit</Button>
    </div>
  }
  const headers: FormHeader<World>[] = [{
    title: 'Name',
    index: 'id',
    render(data, header) {
      return <Input value={data?.[header.index]} />
    },
  }]
  const refresh = () => (world = findById(world.id) as World)
  const save = () => {
    cancel()
  }
  const cancel = () => {
    setEdit(false)
    refresh()
  }
  return <div style={styles.editContainer}>
    <Form data={world} headers={headers}/>
    <div style={styles.btns}>
      <Button onClick={cancel}>Cancel</Button>
      <i style={{width: 5}}/>
      <Button onClick={save}>Save</Button>
    </div>
  </div>
}

export default WorldItem
