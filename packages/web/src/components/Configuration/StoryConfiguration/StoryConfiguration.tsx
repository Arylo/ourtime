import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { useState, lazy } from "react";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import ConfigurationCard from "../ConfigurationCard";

const OButtonSuspense = lazy(() => import("../../O/OButtonSuspense"));
const OSaveButton = lazy(() => import("../../O/OSaveButton"));

export default function StoryConfiguration() {
  const [storyInst, setStoryInst] = useStoryInst()
  const [formData, setFormData] = useState({
    name: storyInst?.name,
    description: storyInst?.description ?? '',
    summary: storyInst?.summary ?? '',
  })
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }
  function changeObject (key: keyof typeof formData) {
    return {
      id: key,
      value: formData[key],
      onChange: handleChange,
    }
  }
  const save = () => {
    storyInst.name = formData.name
    storyInst.description = formData.description
    storyInst.summary = formData.summary
    setStoryInst(storyInst)
  }

  return (<>
    <ConfigurationCard
      title="General"
      action={<OButtonSuspense><OSaveButton onClick={save} /></OButtonSuspense>}
    >
      <form>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="name">Story name</FieldLabel>
              <Input type='text' {...changeObject("name")} autoComplete="off" aria-invalid={formData.name.trim().length === 0} />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Story description</FieldLabel>
              <Input type='text' {...changeObject("description")} autoComplete="off" />
            </Field>
            <Field>
              <FieldLabel htmlFor="summary">Story summary</FieldLabel>
              <Input type='text' {...changeObject("summary")} autoComplete="off" />
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </ConfigurationCard>
  </>);
}
