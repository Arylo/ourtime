import { newStory } from "../src";

const story = newStory({ name: "无职转生" });

const storyWorld = story.listWorlds()[0]
const EarthWorld = storyWorld
  .appendSubWorld({ name: '地球世界', appeared: true })
EarthWorld.appendPlace({ name: '日本' })

const SixWorld =  storyWorld
  .appendSubWorld({ name: '六面世界' })

const c = story.appendCalendar({
  name: '甲龙历',
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

SixWorld.appendPlace({ name: '中央大陆' })
  .appendSubPlace({ name: '阿斯拉王国' })
  .appendSubPlace({ name: '菲托亚领' })
  .appendSubPlace({ name: '布耶纳村' })

SixWorld.appendPlace({ name: '魔大陆' })
SixWorld.appendPlace({ name: '天大陆' })
SixWorld.appendPlace({ name: '贝卡利特大陆' })
SixWorld.appendPlace({ name: '米里斯大陆' })
  .appendSubPlace({ name: '米里斯神圣国' })
SixWorld.appendPlace({ name: '林古斯海' })

const Rudeus = story.appendWho({ name: '鲁迪乌斯·格雷拉特', alias: ['鲁迪乌斯', '鲁迪'] });
const Eris = story.appendWho({ name: '艾莉丝·博雷亚斯·格雷拉特', alias: ['艾莉丝'] });
const Sylphiette = story.appendWho({ name: '希露菲叶特', alias: ['希露菲'] });
const Roxy = story.appendWho({ name: '洛琪希·米格路迪亚', alias: ['洛琪希'] });
const Paul = story.appendWho({ name: '保罗·格雷拉特', alias: ['保罗'] });
const Zenith = story.appendWho({ name: '塞妮丝·格雷拉特', alias: ['塞妮丝'] });
const Lilia = story.appendWho({ name: '莉莉雅', alias: ['莉莉雅'] });

const mainTimeline = SixWorld.listTimelines()[0]

mainTimeline
  .appendHistory({
    name: '鲁迪乌斯出生',
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
  })
  .affectWorld(EarthWorld, { departed: true })
  .affectWho(Rudeus, { appeared: true })
  .affectWho(Paul, { appeared: true })
  .affectWho(Eris, { appeared: true })
  .affectWho(Zenith, { appeared: true })
  .affectWho(Lilia, { appeared: true })

mainTimeline
  .appendHistory({
    name: '鲁迪乌斯学会中级魔法',
    startAt: c.genExactStoryDate(c.toDateNumber(409)),
  })

mainTimeline
  .appendHistory({
    name: '鲁迪乌斯遇见洛琪希，成为魔法导师',
    startAt: c.genExactStoryDate(c.toDateNumber(410)),
  })
  .affectWho(Roxy, { appeared: true })

mainTimeline
  .appendHistory({
    name: '鲁迪乌斯成为圣级水魔法师',
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
  })

mainTimeline
  .appendHistory({
    name: '鲁迪乌斯遇见希露菲叶特',
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
  })
  .affectWho(Sylphiette, { appeared: true })

mainTimeline
  .appendHistory({
    name: '转移事件',
    startAt: c.genApproxStoryDate(c.toDateNumber(414)),
  })

mainTimeline
  .appendHistory({
    name: '转移事件',
    startAt: c.genApproxStoryDate(c.toDateNumber(417)),
  })
