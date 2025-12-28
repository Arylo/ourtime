import { match, P } from "ts-pattern";
import { createCalendar, Calendar } from "../types/Calendar";
import { ApproxStoryDate, ApproxType, createStoryDate, ExactStoryDate, UnknownStoryDate } from "../types/StoryDate";
import { Story } from "../types/Story";

export class CalendarInstance {
  private calendarId: Calendar['id'];

  public get id() {
    return this.calendarId;
  }

  public toObject() {
    return this.story.map.calendars.find(c => c.id === this.calendarId)!;
  }

  constructor(private story: Story, calendarOrId: Calendar['id'] | Parameters<typeof createCalendar>[0] | Calendar) {
    this.calendarId = match(calendarOrId)
      .with(P.string, { id: P.select(P.string) }, (data) => {
        const id = match(data)
          .with({ id: P.select() }, (id) => id)
          .with(P.string, (id) => id)
          .exhaustive();
        const existingCalendar = this.story.map.calendars.find(c => c.id === id);
        if (!existingCalendar) {
          throw new Error(`Calendar with id ${id} not found in story map`);
        }
        return existingCalendar.id;
      })
      .with({ name: P.string, months: P.array() }, (data) => {
        const newCalendar = createCalendar(data);
        this.story.map.calendars.push(newCalendar);
        return newCalendar.id;
      })
      .otherwise(() => {
        throw new Error('Invalid calendarOrId parameter');
      });
  }

  public genStoryDate<
    P extends Omit<Parameters<typeof import('../types/StoryDate').createStoryDate>[0], 'calendarId'>
  >(options: P) {
    return createStoryDate({
      ...options,
      calendarId: this.calendarId,
    });
  }

  public getUnknownStoryDate() {
    return this.genStoryDate({ isUnknown: true }) as UnknownStoryDate
  }

  public getExactStoryDate(rangeStart: number, rangeEnd?: number) {
    return this.genStoryDate({
      rangeStart,
      rangeEnd: rangeEnd ?? rangeStart,
      approx: false,
    }) as ExactStoryDate;
  }

  public getApproxStoryDate(rangeStart: number, rangeEnd: number, approx: true | ApproxType = true) {
    return this.genStoryDate({
      rangeStart,
      rangeEnd,
      approx: approx,
    }) as ApproxStoryDate;
  }

  public year (year: number) {
    const oneYearDays = this.toObject().months?.reduce((sum, month) => sum + month.days, 0)
    return year * (oneYearDays ?? 0);
  }

  public month (month: number) {
    if (month === 0) return 0;
    const months = this.toObject().months;
    if (month < 1 || month > months.length) {
      throw new Error(`Invalid monthIndex: ${month} is out of range`);
    }
    const daysBefore = months.slice(0, month - 1).reduce((sum, month) => sum + month.days, 0);
    return daysBefore;
  }

  public day (day: number) {
    return day;
  }

  public toDateNumber (year?: number, month?: number, day?: number) {
    return this.year(year ?? 0) + this.month(month ?? 0) + this.day(day ?? 0);
  }

  public fromDateNumber (dateNumber: number) {
    let remainingDays = dateNumber;

    const months = this.toObject().months;
    const oneYearDays = months.reduce((sum, month) => sum + month.days, 0);

    const year = Math.floor(remainingDays / oneYearDays);
    remainingDays -= year * oneYearDays;

    let month = 0;
    for (let i = 0; i < months.length; i++) {
      if (remainingDays < months[i].days) {
        month = i + 1;
        break;
      }
      remainingDays -= months[i].days;
    }

    const day = remainingDays;

    return { year, month, day };
  }
}
