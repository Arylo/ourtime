import { newStory } from "../src/index";

const story = newStory({
  name: '葬送的芙丽莲',
  description: '数据来自https://zh.moegirl.org.cn/葬送的芙莉莲/事件年表',
});

const hdCalendar = story.appendCalendar({
  name: '英雄历',
  alias: ['辛死历'],
  description: '年表以勇者辛美尔死亡为纪年基准',
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
});

// 时间点对象
const hdDateMap = {
  // B.H.D. 时间点（英雄历之前）
  '1000 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-1000), hdCalendar.year(-1000)),
  '570 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-570), hdCalendar.year(-570)),
  '370 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-370), hdCalendar.year(-370)),
  '170 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-170), hdCalendar.year(-170)),
  '76 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-76), hdCalendar.year(-76)),
  '60 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-60), hdCalendar.year(-60)),
  '53 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-53), hdCalendar.year(-53)),
  '50 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-50), hdCalendar.year(-50)),
  '20 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-20), hdCalendar.year(-20)),
  '10 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-10), hdCalendar.year(-10)),
  '1 B.H.D.': hdCalendar.getApproxStoryDate(hdCalendar.year(-1), hdCalendar.year(-1)),

  // H.D. 时间点（英雄历之后）
  'H.D. 1': hdCalendar.getApproxStoryDate(hdCalendar.year(1), hdCalendar.year(1)),
  'H.D. 11': hdCalendar.getApproxStoryDate(hdCalendar.year(11), hdCalendar.year(11)),
  'H.D. 19': hdCalendar.getApproxStoryDate(hdCalendar.year(19), hdCalendar.year(19)),
  'H.D. 20': hdCalendar.getApproxStoryDate(hdCalendar.year(20), hdCalendar.year(20)),
  'H.D. 24~25': hdCalendar.getApproxStoryDate(hdCalendar.year(24), hdCalendar.year(25)),
  'H.D. 27': hdCalendar.getApproxStoryDate(hdCalendar.year(27), hdCalendar.year(27)),
  'H.D. 28': hdCalendar.getApproxStoryDate(hdCalendar.year(28), hdCalendar.year(28)),
  'H.D. 29': hdCalendar.getApproxStoryDate(hdCalendar.year(29), hdCalendar.year(29)),
  'H.D. 30': hdCalendar.getApproxStoryDate(hdCalendar.year(30), hdCalendar.year(30)),
  'H.D. 31': hdCalendar.getApproxStoryDate(hdCalendar.year(31), hdCalendar.year(31)),
};
