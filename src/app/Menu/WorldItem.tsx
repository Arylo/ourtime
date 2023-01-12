import { css } from '@stitches/react'
import React from 'react'
import Button from '../../components/Button/Button'
import Form, { FormHeader } from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import View from '../../components/View/View'
import { World } from '../../elements/World'
import useWorld from '../../services/useWorld'

const styles = {
  editContainer: css({
  }),
  btns: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  viewContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  editBtn: css({
    height: 20,
    width: 50,
    minWidth: 50,
  }),
}

const WorldItem: React.FC<{ world: World }> = ({ world }) => {
  const [isEdit, setEdit] = React.useState(false)
  const { findById } = useWorld()
  if (!isEdit) {
    return <View className={styles.viewContainer()}>
      <span>{world.name}</span>
      <Button className={styles.editBtn()} onClick={() => setEdit(true)}>Edit</Button>
    </View>
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
  return <View className={styles.editContainer()}>
    <Form data={world} headers={headers}/>
    <View className={styles.btns()}>
      <Button onClick={cancel}>Cancel</Button>
      <i style={{width: 5}}/>
      <Button onClick={save}>Save</Button>
    </View>
  </View>
}

export default WorldItem
