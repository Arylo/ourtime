import { useEffect, useState, lazy, useContext, useMemo } from "react";
import { Field, FieldLabel, FieldSet, FieldGroup } from "../../ui/field";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import ConfigurationCard from "../ConfigurationCard";
import type { Organize } from "@ourtime/datatypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import OrganizeIdContext from "./OrganizeIdContext";
import { Label } from "@/components/ui/label";
import OInput from "@/components/O/OInput";
import OOrganizeSelect from "@/components/O/OOrganizeSelect";

const OButtonSuspense = lazy(() => import("../../O/OButtonSuspense"));
const OGroupAddButton = lazy(() => import("../../O/OGroupAddButton"));
const OSaveButton = lazy(() => import("../../O/OSaveButton"));
const OCancelButton = lazy(() => import("../../O/OCancelButton"));
const OEditButton = lazy(() => import("../../O/OEditButton"));
const ODeleteButton = lazy(() => import("../../O/ODeleteButton"));

export default function OrganizeConfigurationCard () {
  const { id, setId } = useContext(OrganizeIdContext);
  const [storyInst, setStoryInst] = useStoryInst()
  const organizeInst = useMemo(() => storyInst.findOrganizeById(id)!, [storyInst, id]);
  const [formData, setFormData] = useState<Organize>()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (isEdit && organizeInst) {
      setFormData({ ...organizeInst.toObject() })
    }
  }, [isEdit, organizeInst])
  useEffect(() => {
    setIsEdit(false)
  }, [storyInst, organizeInst])

  const updateOrganize = () => {
    organizeInst.name = formData!.name
    organizeInst.description = formData!.description ?? ''
    organizeInst.appeared = formData!.appeared ?? false
    organizeInst.departed = formData!.departed ?? false
    organizeInst.affiliatedId = formData!.affiliatedId

    setStoryInst(storyInst)
    setIsEdit(false)
  }

  const deleteOrganize = () => {
    const index = storyInst.toObject().map.organizes.findIndex(o => o.id === organizeInst.id);
    if (index !== -1) {
      storyInst.toObject().map.organizes.splice(index, 1);
      setStoryInst(storyInst);
      setId('');
    }
  }

  const appendOrganize = () => {
    const { id: newId } = organizeInst.appendSubOrganize({
      name: 'New Organization',
    })
    setStoryInst(storyInst);
    setId(newId);
  }

  return <>
    <ConfigurationCard
      title={<span>{organizeInst?.name}</span>}
      description={
        isEdit || !organizeInst?.description ? null : <>
          {
            organizeInst?.description ? <div><small>{organizeInst.toObject().description}</small></div> : null
          }
        </>
      }
      action={
        isEdit ? <>
          <OButtonSuspense><OSaveButton onClick={() => updateOrganize()} /></OButtonSuspense>
          <OButtonSuspense><OCancelButton onClick={() => setIsEdit(false)} /></OButtonSuspense>
        </> : <>
          <OButtonSuspense><OGroupAddButton onClick={() => appendOrganize()} /></OButtonSuspense>
          <OButtonSuspense><OEditButton onClick={() => setIsEdit(true)} /></OButtonSuspense>
          <OButtonSuspense><ODeleteButton onClick={() => deleteOrganize()} /></OButtonSuspense>
        </>
      }
    >
      {
        isEdit && formData ? <>
          <form onSubmit={(e) => { e.preventDefault(); updateOrganize(); }}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <OInput
                    value={formData.name}
                    onValueChange={(v) => setFormData({...formData, name: v})}
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <OInput
                    value={formData.description ?? ''}
                    onValueChange={(v) => setFormData({...formData, description: v})}
                  />
                </Field>
                <Field>
                  <FieldLabel>Parent Organization</FieldLabel>
                  <OOrganizeSelect currentId={organizeInst.id} value={formData.affiliatedId ?? 'root'} onValueChange={(v) => setFormData({...formData, affiliatedId: v === 'root' ? undefined : v})} />
                </Field>
                <Field>
                  <FieldLabel>Is Appeared</FieldLabel>
                  <RadioGroup
                    value={formData.appeared ? "true" : "false"}
                    onValueChange={(value) => setFormData({ ...formData, appeared: value === "true" })}
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="true" id="appeared-yes" />
                      <Label htmlFor="appeared-yes" className="cursor-pointer">Appeared</Label>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="false" id="appeared-no" />
                      <Label htmlFor="appeared-no" className="cursor-pointer">Not Appeared</Label>
                    </div>
                  </RadioGroup>
                </Field>
                <Field>
                  <FieldLabel>Is Departed</FieldLabel>
                  <RadioGroup
                    value={formData.departed ? "true" : "false"}
                    onValueChange={(value) => setFormData({ ...formData, departed: value === "true" })}
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="true" id="departed-yes" />
                      <Label htmlFor="departed-yes" className="cursor-pointer">Departed</Label>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="false" id="departed-no" />
                      <Label htmlFor="departed-no" className="cursor-pointer">Not Departed</Label>
                    </div>
                  </RadioGroup>
                </Field>
              </FieldSet>
            </FieldGroup>
          </form>
        </> : null
      }
    </ConfigurationCard>
  </>
}
