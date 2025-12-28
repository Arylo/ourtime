import { createCalendar, Calendar } from "../types/Calendar";
import { Story } from "../types/Story";
import { CalendarInstance } from "./CalendarInstance";

export function newCalendar(story: Story, calendar: Parameters<typeof createCalendar>[0]) {
  return new CalendarInstance(story, calendar);
}

export function loadCalendar(story: Story, calendarOrId: Calendar['id'] | Calendar) {
  return new CalendarInstance(story, calendarOrId);
}
