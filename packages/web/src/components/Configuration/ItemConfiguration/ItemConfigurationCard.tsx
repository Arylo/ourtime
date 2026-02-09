import { useEffect, useState, lazy } from "react";
import { Field, FieldLabel, FieldSet, FieldGroup } from "../../ui/field";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import ConfigurationCard from "../ConfigurationCard";
import type { Item, ItemInstance } from "@ourtime/datatypes";
import { Input } from "@/components/ui/input";

export interface ItemConfigurationCardProps {
  itemInst: ItemInstance;
}

const OButtonSuspense = lazy(() => import("../../O/OButtonSuspense"));
const OSaveButton = lazy(() => import("../../O/OSaveButton"));
const OCancelButton = lazy(() => import("../../O/OCancelButton"));
const OEditButton = lazy(() => import("../../O/OEditButton"));
const ODeleteButton = lazy(() => import("../../O/ODeleteButton"));

export default function ItemConfigurationCard (props: ItemConfigurationCardProps) {
  const itemInst = props.itemInst
  const [formData, setFormData] = useState<Item>(itemInst.toObject())
  const [isEdit, setIsEdit] = useState(false)
  const [storyInst, setStoryInst] = useStoryInst()

  useEffect(() => {
    if (isEdit) {
      setFormData({ ...itemInst.toObject() })
    }
  }, [isEdit, itemInst])

  const updateItem = () => {
    const obj = itemInst.toObject()
    obj.name = formData.name
    obj.description = formData.description

    setStoryInst(storyInst)
    setIsEdit(false)
  }

  const deleteItem = () => {
    const index = storyInst.toObject().map.items.findIndex(i => i.id === itemInst.id);
    if (index !== -1) {
        storyInst.toObject().map.items.splice(index, 1);
        setStoryInst(storyInst);
    }
  }

  return <>
    <ConfigurationCard
      title={<span>{itemInst.toObject().name}</span>}
      description={
        isEdit || !itemInst.toObject().description ? null : <>
          {
            itemInst.toObject().description ? <div><small>{itemInst.toObject().description}</small></div> : null
          }
        </>
      }
      action={
        isEdit ? <>
          <OButtonSuspense><OSaveButton onClick={() => updateItem()} /></OButtonSuspense>
          <OButtonSuspense><OCancelButton onClick={() => setIsEdit(false)} /></OButtonSuspense>
        </> : <>
          <OButtonSuspense><OEditButton onClick={() => setIsEdit(true)} /></OButtonSuspense>
          <OButtonSuspense><ODeleteButton onClick={() => deleteItem()} /></OButtonSuspense>
        </>
      }
    >
      {
        isEdit ? <>
          <form onSubmit={(e) => { e.preventDefault(); updateItem(); }}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    value={formData.description ?? ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </Field>
              </FieldSet>
            </FieldGroup>
          </form>
        </> : null
      }
    </ConfigurationCard>
  </>
}
