import { HistoryPlaceRole, HistoryWhoRole, newStory } from "../src";

const story = newStory({ name: "无职转生" });

const storyWorld = story.listWorlds()[0]
const EarthWorld = storyWorld
  .appendSubWorld({ name: '地球世界', appeared: true })
EarthWorld.appendPlace({ name: '日本' })

const ceCalendar = story.appendCalendar({
  name: '公元历',
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

story
  .appendHistory({
    name: '鲁迪乌斯出生',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
  })
  .associateTimeline(EarthWorld.listTimelines()[0], {
    startAt: ceCalendar.getUnknownStoryDate(),
    endAt: ceCalendar.getUnknownStoryDate(),
  })
  .associatePlace(EarthWorld.findPlaceByName('日本')!, {
    startAt: ceCalendar.getUnknownStoryDate(),
    endAt: ceCalendar.getUnknownStoryDate(),
    role: HistoryPlaceRole.OCCURRED_IN,
  })
  .associatePlace(EarthWorld.findPlaceByName('布耶纳村')!, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryPlaceRole.OCCURRED_IN,
  })
  .associateWho(Rudeus, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Paul, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Eris, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Zenith, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Lilia, {
    startAt: c.genApproxStoryDate(c.toDateNumber(407)),
    endAt: c.genApproxStoryDate(c.toDateNumber(407)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .affectWorld(EarthWorld, { departed: true })
  .affectWho(Rudeus, { appeared: true })
  .affectWho(Paul, { appeared: true })
  .affectWho(Eris, { appeared: true })
  .affectWho(Zenith, { appeared: true })
  .affectWho(Lilia, { appeared: true })

story
  .appendHistory({
    name: '鲁迪乌斯学会中级魔法',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genExactStoryDate(c.toDateNumber(409)),
    endAt: c.genExactStoryDate(c.toDateNumber(409)),
  })
  .associateWho(Rudeus, {
    startAt: c.genExactStoryDate(c.toDateNumber(409)),
    endAt: c.genExactStoryDate(c.toDateNumber(409)),
    role: HistoryWhoRole.PARTICIPANT,
  })

story
  .appendHistory({
    name: '鲁迪乌斯遇见洛琪希，成为魔法导师',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genExactStoryDate(c.toDateNumber(410)),
    endAt: c.genExactStoryDate(c.toDateNumber(410)),
  })
  .associatePlace(SixWorld.findPlaceByName('布耶纳村')!, {
    startAt: c.genExactStoryDate(c.toDateNumber(410)),
    endAt: c.genExactStoryDate(c.toDateNumber(410)),
    role: HistoryPlaceRole.OCCURRED_IN,
  })
  .associateWho(Rudeus, {
    startAt: c.genExactStoryDate(c.toDateNumber(410)),
    endAt: c.genExactStoryDate(c.toDateNumber(410)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Roxy, {
    startAt: c.genExactStoryDate(c.toDateNumber(410)),
    endAt: c.genExactStoryDate(c.toDateNumber(410)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .affectWho(Roxy, { appeared: true })

story
  .appendHistory({
    name: '鲁迪乌斯成为圣级水魔法师',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
  })
  .associatePlace(SixWorld.findPlaceByName('布耶纳村')!, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryPlaceRole.OCCURRED_IN,
  })
  .associateWho(Rudeus, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Roxy, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryWhoRole.PARTICIPANT,
  })

story
  .appendHistory({
    name: '鲁迪乌斯遇见希露菲叶特',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
  })
  .associatePlace(SixWorld.findPlaceByName('布耶纳村')!, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryPlaceRole.OCCURRED_IN,
  })
  .associateWho(Rudeus, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .associateWho(Sylphiette, {
    startAt: c.genApproxStoryDate(c.toDateNumber(412)),
    endAt: c.genApproxStoryDate(c.toDateNumber(412)),
    role: HistoryWhoRole.PARTICIPANT,
  })
  .affectWho(Sylphiette, { appeared: true })

story
  .appendHistory({
    name: '转移事件',
  })
  .associateTimeline(mainTimeline, {
    startAt: c.genApproxStoryDate(c.toDateNumber(417)),
    endAt: c.genApproxStoryDate(c.toDateNumber(417)),
  })
