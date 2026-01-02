import { newStory } from "../src/index";

const story = newStory({
  name: "JOJO",
  summary: "一个关于冒险与命运的故事",
  description: "数据来自https://www.bilibili.com/video/BV1cUkoBKEc8",
});

const ceCalendar = story.appendCalendar({
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
const year = ceCalendar.year

// 添加宇宙
const universe = story.appendWorld({ name: "宇宙", description: "包含所有世界的宇宙" });
const solarSystem = universe.appendPlace({ name: "太阳系", description: "太阳系的中心恒星" });
const earth = solarSystem.appendSubPlace({ name: "地球", description: "人类居住的蓝色星球" });
earth.appendSubPlace({ name: "亚洲", description: "面积最大的大洲" });
earth.appendSubPlace({ name: "非洲", description: "面积第二大的大洲" });
earth.appendSubPlace({ name: "北美洲", description: "面积第三大的大洲" });
earth.appendSubPlace({ name: "南美洲", description: "面积第四大的大洲" });
earth.appendSubPlace({ name: "欧洲", description: "面积第六大的大洲" });

const rootTimeline = universe.listTimelines()[0]

const dateMap = {
  unknownStoryDate: ceCalendar.getUnknownStoryDate(),
  // 公约前约30000年
  BC30000Approx: ceCalendar.genApproxStoryDate(year(-30000), year(-30000)),
  // 公约前约10000年
  BC10000Approx: ceCalendar.genApproxStoryDate(year(-10000), year(-10000)),
  // 公约前约30000年到约10000年
  BC30000_10000Approx: ceCalendar.genApproxStoryDate(year(-30000), year(-10000)),
  // 公约前约3000年
  BC3000Approx: ceCalendar.genApproxStoryDate(year(-3000), year(-3000)),
} as const

// 第二部
const secondPartTimeline = rootTimeline.fork({ name: '第二部时间线', baseAt: dateMap.unknownStoryDate });
const jojo2 = story.appendWho({ name: '约瑟夫·乔斯达', description: 'JOJO的第二代，机智的冒险家' });
const kars = story.appendWho({ name: '卡兹', description: 'JOJO的宿敌，强大的吸血鬼' });
const esidisi = story.appendWho({ name: '艾西迪西', description: '卡兹的忠实追随者' });
const wanuu = story.appendWho({ name: '瓦姆乌', description: '卡兹的忠实追随者' });
const santana = story.appendWho({ name: '桑塔纳', description: '卡兹的忠实追随者' });

secondPartTimeline.appendHistory({
  name: '卡兹出生',
  startAt: dateMap.BC30000Approx,
  endAt: dateMap.BC30000Approx,
})
secondPartTimeline.appendHistory({
  name: '卡兹发明石鬼面',
  startAt: dateMap.BC10000Approx,
  endAt: dateMap.BC10000Approx,
})
secondPartTimeline.appendHistory({
  name: '艾西迪西出生',
  startAt: dateMap.BC30000_10000Approx,
  endAt: dateMap.BC30000_10000Approx,
})
secondPartTimeline.appendHistory({
  name: '瓦姆乌出生',
  startAt: dateMap.BC10000Approx,
  endAt: dateMap.BC10000Approx,
})
secondPartTimeline.appendHistory({
  name: '桑塔纳出生',
  startAt: dateMap.BC10000Approx,
  endAt: dateMap.BC10000Approx,
})
secondPartTimeline.appendHistory({
  name: '首次出现柱之男, 石鬼面相关的记录',
  startAt: dateMap.BC3000Approx,
  endAt: dateMap.BC3000Approx,
})
