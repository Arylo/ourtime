import { useEffect, useState, lazy } from "react";
import { Field, FieldLabel, FieldSet, FieldGroup } from "../../ui/field";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import ConfigurationCard from "../ConfigurationCard";
import type { Who, WhoInstance } from "@ourtime/datatypes";
import { Badge } from "@/components/ui/badge";
import OInputList from "../../O/OInputList";
import OInput from "@/components/O/OInput";

export interface WhoConfigurationCardProps {
  whoInst: WhoInstance;
}

const OButtonSuspense = lazy(() => import("../../O/OButtonSuspense"));
const OSaveButton = lazy(() => import("../../O/OSaveButton"));
const OCancelButton = lazy(() => import("../../O/OCancelButton"));
const OEditButton = lazy(() => import("../../O/OEditButton"));
const ODeleteButton = lazy(() => import("../../O/ODeleteButton"));

export default function WhoConfigurationCard (props: WhoConfigurationCardProps) {
  const whoInst = props.whoInst
  const [formData, setFormData] = useState<Who>(whoInst.toObject())
  const [isEdit, setIsEdit] = useState(false)
  const [storyInst, setStoryInst] = useStoryInst()

  // Sync formData with instance when entering edit mode
  useEffect(() => {
    if (isEdit) {
      const currentFormData = whoInst.toObject()
      if (!currentFormData.alias || currentFormData.alias.length === 0) {
        currentFormData.alias = ['']
      }
      setFormData(currentFormData)
    }
  }, [isEdit, whoInst])

  const updateWho = () => {
    const obj = whoInst.toObject()
    obj.name = formData.name
    obj.description = formData.description
    obj.alias = (formData.alias ?? []).map(a => a.trim()).filter(Boolean)

    setStoryInst(storyInst)
    setIsEdit(false)
  }

  const deleteWho = () => {
    const index = storyInst.toObject().map.who.findIndex(w => w.id === whoInst.id);
    if (index !== -1) {
        storyInst.toObject().map.who.splice(index, 1);
        setStoryInst(storyInst);
    }
  }

  return <>
    <ConfigurationCard
      title={<span>{whoInst.toObject().name}</span>}
      description={
        isEdit || ((whoInst.toObject().alias?.length ?? 0) === 0 && !whoInst.toObject().description) ? null : <>
          {
            (whoInst.toObject().alias?.length ?? 0) > 0 ? <div className="flex w-full flex-wrap gap-2">
              {whoInst.toObject().alias?.map((alias, index) => <Badge key={index} variant='outline'><small>{alias}</small></Badge>)}
            </div> : null
          }
          {
            whoInst.toObject().description ? <div><small>{whoInst.toObject().description}</small></div> : null
          }
        </>
      }
      action={
        isEdit ? <>
          <OButtonSuspense><OSaveButton onClick={() => updateWho()} /></OButtonSuspense>
          <OButtonSuspense><OCancelButton onClick={() => setIsEdit(false)} /></OButtonSuspense>
        </> : <>
          <OButtonSuspense><OEditButton onClick={() => setIsEdit(true)} /></OButtonSuspense>
          <OButtonSuspense><ODeleteButton onClick={() => deleteWho()} /></OButtonSuspense>
        </>
      }
    >
      {
        isEdit ? <>
          <form onSubmit={(e) => { e.preventDefault(); updateWho(); }}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <OInput
                    value={formData.name}
                    onValueChange={(value) => setFormData({...formData, name: value})}
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <OInput
                    value={formData.description ?? ''}
                    onValueChange={(value) => setFormData({...formData, description: value})}
                  />
                </Field>
                <Field>
                  <FieldLabel>Alias</FieldLabel>
                  <OInputList
                    value={formData.alias ?? []}
                    onValueChange={(val) => setFormData({...formData, alias: val})}
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
