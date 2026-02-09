import { useEffect, useState, lazy } from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "../../ui/field";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import ConfigurationCard from "../ConfigurationCard";
import type { Calendar, CalendarInstance } from "@ourtime/datatypes";
import OInput from "../../O/OInput";
import OInputList from "../../O/OInputList";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CalendarMonths from "./CalendarMonths";

export interface CalendarConfigurationCardProps {
  calendarInst: CalendarInstance;
}

const OButtonSuspense = lazy(() => import("../../O/OButtonSuspense"));
const OSaveButton = lazy(() => import("../../O/OSaveButton"));
const OCancelButton = lazy(() => import("../../O/OCancelButton"));
const OEditButton = lazy(() => import("../../O/OEditButton"));
const ODeleteButton = lazy(() => import("../../O/ODeleteButton"));

const MONTH_TYPE = {
  INF: 'inf',
  MONTHS: 'months',
} as const
type MonthType = typeof MONTH_TYPE[keyof typeof MONTH_TYPE]

export default function CalendarConfigurationCard (props: CalendarConfigurationCardProps) {
  const calendarInst = props.calendarInst
  const [formData, setFormData] = useState<Calendar>(calendarInst.toObject())
  const [isEdit, setIsEdit] = useState(false)
  const [storyInst, setStoryInst] = useStoryInst()
  const [monthType, setMonthType] = useState<MonthType>(MONTH_TYPE.INF)
  const updateCalendar = () => {
    calendarInst.name = formData.name
    calendarInst.alias = (formData.alias ?? []).map(a => a.trim()).filter(Boolean)
    calendarInst.description = formData.description ?? ''
    calendarInst.months = formData.months
    setStoryInst(storyInst)
    setIsEdit(false)
  }
  const deleteCalendar = () => {
    storyInst.removeCalendarById(calendarInst.id)
    setStoryInst(storyInst)
  }
  useEffect(() => {
    if (isEdit) {
      const calendar = storyInst.findCalendarById(calendarInst.id)!.toObject()
      setFormData(calendar)
      setMonthType(
        calendar.months.length === 1 && calendar.months[0].days === Number.MAX_SAFE_INTEGER ?
        MONTH_TYPE.INF :
        MONTH_TYPE.MONTHS
      )
    }
  }, [isEdit])
  useEffect(() => {
    if (monthType === MONTH_TYPE.INF) {
      setFormData({ ...formData, months: [{ name: '', days: Number.MAX_SAFE_INTEGER }] })
    } else {
      const calendar = storyInst.findCalendarById(calendarInst.id)!.toObject()
      if (calendar.months.length === 1 && calendar.months[0].days === Number.MAX_SAFE_INTEGER) {
        setFormData({ ...formData, months: [{ name: '', days: 30 }] })
      } else {
        setFormData({ ...formData, months: calendar.months })
      }
    }
  }, [monthType])
  return <>
    <ConfigurationCard
      key={calendarInst.id}
      title={<span>{calendarInst.name}</span>}
      description={
        isEdit || (calendarInst.alias.length === 0 || !calendarInst.description) ? null : <>
          {
            calendarInst.alias.length === 0 ? null : <div className="flex w-full flex-wrap gap-2">
              {calendarInst.alias.map((alias, index) => <Badge key={index} variant='outline'><small>{alias}</small></Badge>)}
            </div>
          }
          {
            calendarInst.description ? <div><small>{calendarInst.description}</small></div> : null
          }
        </>
      }
      action={
        isEdit ? <>
          <OButtonSuspense><OSaveButton onClick={() => updateCalendar()} /></OButtonSuspense>
          <OButtonSuspense><OCancelButton onClick={() => setIsEdit(false)} /></OButtonSuspense>
        </> : <>
          <OButtonSuspense><OEditButton onClick={() => setIsEdit(true)} /></OButtonSuspense>
          <OButtonSuspense><ODeleteButton onClick={() => deleteCalendar()} /></OButtonSuspense>
        </>
      }
    >
      {
        isEdit ? <>
          <form>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="name">Calendar Name</FieldLabel>
                  <OInput
                    type='text'
                    key='name'
                    value={formData.name}
                    onValueChange={(value) => setFormData({ ...formData, name: value })}
                    autoComplete="off"
                    aria-invalid={formData.name.trim().length === 0}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="alias">Calendar Alias</FieldLabel>
                  <OInputList
                    value={formData.alias ?? []}
                    onValueChange={(alias) => setFormData({ ...formData, alias })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Calendar Description</FieldLabel>
                  <OInput
                    type='text'
                    key='description'
                    value={formData.description}
                    onValueChange={(value) => setFormData({ ...formData, description: value })}
                    autoComplete="off"
                  />
                </Field>
                <Field>
                  <FieldLabel>Calendar Months</FieldLabel>
                  <RadioGroup value={monthType} className="w-full" onValueChange={(v) => setMonthType(v as MonthType)}>
                    <FieldLabel htmlFor="inf-months">
                      <Field orientation="horizontal" className="py-2 px-3 cursor-pointer">
                        <FieldContent>
                          <FieldTitle>Only Days</FieldTitle>
                          <FieldDescription>
                            Only record Days in this calendar.
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value={MONTH_TYPE.INF} className="self-center" id="inf-months" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="months-months">
                      <Field orientation="horizontal" className="py-2 px-3 cursor-pointer">
                        <FieldContent>
                          <FieldTitle>Custom Months</FieldTitle>
                          <FieldDescription>
                            Define custom months for this calendar.
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value={MONTH_TYPE.MONTHS} className="self-center" id="months-months" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </Field>
                {
                  monthType === MONTH_TYPE.INF ? null :<>
                    <Field>
                      <FieldLabel>Calendar Custom Months</FieldLabel>
                      <CalendarMonths
                        months={formData.months}
                        onValueChange={(m) => setFormData({ ...formData, months: m })}
                      />
                    </Field>
                  </>
                }
              </FieldSet>
            </FieldGroup>
          </form>
        </> : <>
        </>
      }
    </ConfigurationCard>
  </>
}
