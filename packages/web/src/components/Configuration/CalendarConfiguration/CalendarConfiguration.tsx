import { useMemo } from "react";
import useStoryInst from "../../../contexts/StoryContext/useStoryInst";
import { Empty, EmptyContent, EmptyTitle } from "../../ui/empty";
import { Button } from "../../ui/button";
import CalendarConfigurationCard from "./CalendarConfigurationCard";

export default function CalendarConfiguration () {
  const [storyInst, setStoryInst] = useStoryInst()
  const calendarInsts = useMemo(() => storyInst.listCalendars(), [storyInst])
  const newCalendar = () => {
    storyInst.appendCalendar({ name: 'New Calendar', months: [{ name: ' ', days: Number.MAX_SAFE_INTEGER }] })
    setStoryInst(storyInst)
  }
  return <>
    {
      calendarInsts.length === 0 ? <>
        <Empty>
          <EmptyTitle>No calendars in the story.</EmptyTitle>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="cursor-pointer" variant={'outline'} onClick={newCalendar}>Create Calendar</Button>
          </EmptyContent>
        </Empty>
      </> : <>
        <div className="flex flex-col gap-2">
          {
            calendarInsts.map(calendarInst => (
              <CalendarConfigurationCard
                key={calendarInst.id}
                calendarInst={calendarInst}
              ></CalendarConfigurationCard>
            ))
          }
          <Button onClick={newCalendar} className="w-full cursor-pointer shadow-sm">Append Calendar</Button>
        </div>
      </>
    }
  </>
}
