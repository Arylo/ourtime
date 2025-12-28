import { createCalendar } from "./Calendar";
import { createStoryDate } from "./StoryDate";

// 故事日历, 一年有十二个月, 每个月有三十天
const storyCalendar = createCalendar({
  name: '故事日历',
  description: '用于故事时间线的日历',
  months: [
    { name: '一月', days: 30 },
    { name: '二月', days: 30 },
    { name: '三月', days: 30 },
    { name: '四月', days: 30 },
    { name: '五月', days: 30 },
    { name: '六月', days: 30 },
    { name: '七月', days: 30 },
    { name: '八月', days: 30 },
    { name: '九月', days: 30 },
    { name: '十月', days: 30 },
    { name: '十一月', days: 30 },
    { name: '十二月', days: 30 },
  ],
})

// 未知时间
createStoryDate({ isUnknown: true });
// 约第20天
createStoryDate({ rangeStart: 20, rangeEnd: 20, approx: true, calendarId: storyCalendar.id });
// 约几年
createStoryDate({ approx: 'year', calendarId: storyCalendar.id });

// 故事日历, 一年有十二个月, 每个月有三十天
const ceCalendar = createCalendar({
  name: '公元历',
  description: '通用的公历系统',
  months: [
    { name: '一月', days: 31 },
    { name: '二月', days: 28 },
    { name: '三月', days: 31 },
    { name: '四月', days: 30 },
    { name: '五月', days: 31 },
    { name: '六月', days: 30 },
    { name: '七月', days: 31 },
    { name: '八月', days: 31 },
    { name: '九月', days: 30 },
    { name: '十月', days: 31 },
    { name: '十一月', days: 30 },
    { name: '十二月', days: 31 },
  ],
})

const ceYear = (year: number) => {
  const oneYearDays = ceCalendar.months?.reduce((sum, month) => sum + month.days, 0);
  return year * oneYearDays!;
}
const ceMonth = (month: number) => {
  return ceCalendar.months?.slice(0, month - 1).reduce((sum, m) => sum + m.days, 0) || 0;
}
const ceDay = (day: number) => {
  return day
}

// 约公元前30000年
createStoryDate({ rangeStart: ceYear(-30000), rangeEnd: ceYear(-30000), approx: true, calendarId: ceCalendar.id });
// 约公元前30000年到公元前10000年
createStoryDate({ rangeStart: ceYear(-30000), rangeEnd: ceYear(-10000), approx: true, calendarId: ceCalendar.id });
// 公元1931年9月18日
createStoryDate({ rangeStart: ceYear(1931) + ceMonth(9) + ceDay(18), rangeEnd: ceYear(1931) + ceMonth(9) + ceDay(18), calendarId: ceCalendar.id });
// 公元1939年9月1日到1945年9月2日
createStoryDate({ rangeStart: ceYear(1939) + ceMonth(9) + ceDay(1), rangeEnd: ceYear(1945) + ceMonth(9) + ceDay(2), calendarId: ceCalendar.id });
// 1937年12月13日后的几天
createStoryDate({ rangeStart: ceYear(1937) + ceMonth(12) + ceDay(13), rangeEnd: ceYear(1937) + ceMonth(12) + ceDay(13), approx: 'day', calendarId: ceCalendar.id });
