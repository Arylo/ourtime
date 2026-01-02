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

  public genExactStoryDate(rangeStart: number, rangeEnd?: number) {
    return this.genStoryDate({
      rangeStart,
      rangeEnd: rangeEnd ?? rangeStart,
      approx: false,
    }) as ExactStoryDate;
  }

  public genApproxStoryDate(rangeStart: number, rangeEnd?: number, approx: true | ApproxType = true) {
    return this.genStoryDate({
      rangeStart,
      rangeEnd: rangeEnd ?? rangeStart,
      approx: approx,
    }) as ApproxStoryDate;
  }

  public year (year: number) {
    if (year === 0) return 0;
    const oneYearDays = this.toObject().months?.reduce((sum, month) => sum + month.days, 0)
    return (year > 0 ? year - 1 : year) * (oneYearDays ?? 0);
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
    const [_year, _month, _day] = [year, month, day].map(v => v ?? 0);
    return this.year(_year) + this.month(_month) + this.day(_day) + (_year >= 0 ? 0 : -1);
  }

  public fromDateNumber (dateNumber: number) {
    if (typeof dateNumber === 'number') {
      // 可以是{ year: 0, month: 0, day: 0 }
      // 也可以是{ year: 1, month: 0, day: 0 }
      // 也可以是{ year: 0, month: 1, day: 0 }
      // 也可以是{ year: 1, month: 1, day: 0 }
      if (dateNumber === 0) return { year: 1, month: 1, day: 0 };

      let remainingDays = dateNumber;
      const months = this.toObject().months;
      const oneYearDays = months.reduce((sum, month) => sum + month.days, 0);

      if (dateNumber > 0) {
        let year = Math.floor(remainingDays / oneYearDays);
        remainingDays -= year * oneYearDays;
        year += 1

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

      if (dateNumber < 0) {
        // 处理负数日期
        // 例如：-1 表示公元前1年的最后一天
        // -oneYearDays 表示公元前1年的第1天
        let remainingDays = -dateNumber; // 转为正数处理
        const oneYearDays = months.reduce((sum, month) => sum + month.days, 0);

        // 计算年份（负数）
        let year = -Math.floor((remainingDays - 1) / oneYearDays) - 1;
        remainingDays = (remainingDays - 1) % oneYearDays;

        // 计算月份和天数（从最后一个月向前计算）
        let month = months.length;
        let day = 0;

        for (let i = months.length - 1; i >= 0; i--) {
          if (remainingDays < months[i].days) {
            month = i + 1;
            day = months[i].days - remainingDays;
            break;
          }
          remainingDays -= months[i].days;
        }

        return { year, month, day };
      }
    }

    throw new Error('Invalid dateNumber');
  }
}
