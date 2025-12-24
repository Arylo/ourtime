import { describe, it, expect } from 'vitest';
import { newStory, loadStory } from './instance';
import { HistoryTimelineRole } from './HistoryTimeline';
import { HistoryPlaceRole } from './HistoryPlace';
import { HistoryOrganizeRole } from './HistoryOrganize';
import { createStoryDate } from './StoryDate';
import { createHistoryPlace } from './HistoryPlace';
import { createItemPlace, ItemPlaceRole } from './ItemPlace';
import { createOrganizePlace } from './OrganizePlace';
import { createHistoryWho, HistoryWhoRole } from './HistoryWho';
import { createItemWho, ItemWhoRole } from './ItemWho';
import { createOrganizeWho, OrganizeWhoRole } from './OrganizeWho';
import { createWorldWho, WorldWhoRole } from './WorldWho';

// helper to extract plain object for assertions
const toPlain = (s: ReturnType<typeof newStory>) => s.toObject();

describe('instance.newStory', () => {
  it('creates a story with default world/timeline/calendars/history', () => {
    const s = newStory({ name: '测试故事' });
    const map = s.map;

    expect(map.world.length).toBe(1);
    expect(map.world[0].name).toBe('主世界');

    expect(map.timeline.length).toBe(1);
    expect(map.timeline[0].name).toBe('主时间线');

    expect(map.Histories.length).toBe(1);
    expect(map.Histories[0].name).toBe('故事开始');

    expect(map.historyTimeline.length).toBe(1);
    expect(map.historyTimeline[0].role).toBe(HistoryTimelineRole.OCCURRED_IN);
    expect(map.historyTimeline[0].historyId).toBe(map.Histories[0].id);
    expect(map.historyTimeline[0].timelineId).toBe(map.timeline[0].id);

    // calendars: 故事历
    expect(map.calendars.length).toBe(1);
    const calendarNames = map.calendars.map(c => c.name);
    expect(calendarNames).toEqual(expect.arrayContaining(['故事历']));
  });

  it('toObject preserves data for persistence', () => {
    const s = newStory({ name: '测试故事' });
    const raw = toPlain(s);

    expect(raw.id).toBe(s.id);
    expect(raw.name).toBe('测试故事');
    expect(raw.map.world.length).toBe(1);
    expect(raw.map.historyTimeline.length).toBe(1);
  });

  it('addSimpleWorldHistory creates history and links to world', () => {
    const s = newStory({ name: '测试故事' });
    const date = createStoryDate({
      rangeStart: 10,
      rangeEnd: 20,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleWorldHistory({ name: '新事件', date, world: s.map.world[0] });

    expect(s.map.Histories).toContain(hist);
    expect(hist.startAt?.rangeStart).toBe(10);
    expect(hist.endAt?.rangeEnd).toBe(20);

    expect(s.map.historyWorld.some(hw => hw.historyId === hist.id)).toBe(true);
  });
});

describe('instance.loadStory', () => {
  it('hydrates a story instance from plain object', () => {
    const created = newStory({ name: '原始故事' });
    const raw = toPlain(created);

    const loaded = loadStory(raw);
    expect(loaded.id).toBe(created.id);
    expect(loaded.name).toBe('原始故事');
    expect(loaded.map.world[0].name).toBe('主世界');
    expect(loaded.map.historyTimeline[0].historyId).toBe(loaded.map.Histories[0].id);
  });
});

describe('ThisStory place operations', () => {
  it('appendPlace creates place and links to default world', () => {
    const s = newStory({ name: '测试故事' });
    const place = s.appendPlace({ name: '首个地点' });

    expect(s.map.places.some(p => p.id === place.id)).toBe(true);
    const relation = s.map.worldPlace.find(wp => wp.placeId === place.id);
    expect(relation?.worldId).toBe(s.map.world[0].id);
  });

  it('updatePlace can edit fields and rebind world', () => {
    const s = newStory({ name: '测试故事' });
    const place = s.appendPlace({ name: '旧地点' });
    const otherWorld = s.appendWorld({ name: '第二世界' });

    const updated = s.updatePlace(place.id, {
      name: '新地点',
      appeared: true,
      world: otherWorld,
    });

    expect(updated.name).toBe('新地点');
    expect(updated.appeared).toBe(true);

    const relations = s.map.worldPlace.filter(wp => wp.placeId === place.id);
    expect(relations).toHaveLength(1);
    expect(relations[0].worldId).toBe(otherWorld.id);
  });

  it('removePlace deletes place and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const place = s.appendPlace({ name: '待删除地点' });

    s.map.historyPlace.push(createHistoryPlace({
      historyId: 'h1',
      placeId: place.id,
      role: HistoryPlaceRole.OCCURRED_IN,
    }));
    s.map.itemPlace.push(createItemPlace({
      itemId: 'i1',
      placeId: place.id,
      role: ItemPlaceRole.OWNER,
    }));
    s.map.organizePlace.push(createOrganizePlace({
      organizeId: 'o1',
      placeId: place.id,
    }));

    s.removePlace(place.id);

    expect(s.map.places.some(p => p.id === place.id)).toBe(false);
    expect(s.map.worldPlace.some(wp => wp.placeId === place.id)).toBe(false);
    expect(s.map.historyPlace.some(hp => hp.placeId === place.id)).toBe(false);
    expect(s.map.itemPlace.some(ip => ip.placeId === place.id)).toBe(false);
    expect(s.map.organizePlace.some(op => op.placeId === place.id)).toBe(false);
  });
});

describe('ThisStory Who operations', () => {
  it('appendWho creates who and links to default world', () => {
    const s = newStory({ name: '测试故事' });
    const who = s.appendWho({ name: '主角', description: '故事的主人公' });

    expect(s.map.who.some(w => w.id === who.id)).toBe(true);
    const relation = s.map.worldWho.find(ww => ww.whoId === who.id);
    expect(relation?.worldId).toBe(s.map.world[0].id);
  });

  it('updateWho can edit fields and rebind world', () => {
    const s = newStory({ name: '测试故事' });
    const who = s.appendWho({ name: '旧名字', description: '原始描述' });
    const otherWorld = s.appendWorld({ name: '第二世界' });

    const updated = s.updateWho(who.id, {
      name: '新名字',
      description: '新描述',
      appeared: true,
      world: otherWorld,
    });

    expect(updated.name).toBe('新名字');
    expect(updated.description).toBe('新描述');
    expect(updated.appeared).toBe(true);

    const relations = s.map.worldWho.filter(ww => ww.whoId === who.id);
    expect(relations).toHaveLength(1);
    expect(relations[0].worldId).toBe(otherWorld.id);
  });

  it('removeWho deletes who and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const who = s.appendWho({ name: '待删除人物', description: '临时人物' });

    s.map.historyWho.push(createHistoryWho({
      historyId: 'h1',
      whoId: who.id,
      role: HistoryWhoRole.PARTICIPANT,
    }));
    s.map.itemWho.push(createItemWho({
      itemId: 'i1',
      whoId: who.id,
      role: ItemWhoRole.OWNER,
    }));
    s.map.organizeWho.push(createOrganizeWho({
      organizeId: 'o1',
      whoId: who.id,
      role: OrganizeWhoRole.MEMBER,
    }));

    s.removeWho(who.id);

    expect(s.map.who.some(w => w.id === who.id)).toBe(false);
    expect(s.map.worldWho.some(ww => ww.whoId === who.id)).toBe(false);
    expect(s.map.historyWho.some(hw => hw.whoId === who.id)).toBe(false);
    expect(s.map.itemWho.some(iw => iw.whoId === who.id)).toBe(false);
    expect(s.map.organizeWho.some(ow => ow.whoId === who.id)).toBe(false);
  });
});

describe('ThisStory World operations', () => {
  it('updateWorld can edit fields', () => {
    const s = newStory({ name: '测试故事' });
    const world = s.map.world[0];

    const updated = s.updateWorld(world.id, {
      name: '新世界名字',
    });

    expect(updated.name).toBe('新世界名字');
  });

  it('removeWorld deletes world and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const world = s.appendWorld({ name: '待删除世界' });

    s.map.worldWho.push(createWorldWho({
      worldId: world.id,
      whoId: 'w1',
      role: WorldWhoRole.OWNER,
    }));

    s.removeWorld(world.id);

    expect(s.map.world.some(w => w.id === world.id)).toBe(false);
    expect(s.map.worldWho.some(ww => ww.worldId === world.id)).toBe(false);
    expect(s.map.worldTimeline.some(wt => wt.worldId === world.id)).toBe(false);
    expect(s.map.worldPlace.some(wp => wp.worldId === world.id)).toBe(false);
    expect(s.map.historyWorld.some(hw => hw.worldId === world.id)).toBe(false);
  });
});

describe('ThisStory Timeline operations', () => {
  it('appendTimeline creates timeline', () => {
    const s = newStory({ name: '测试故事' });
    const timeline = s.appendTimeline({ name: '新时间线' });

    expect(s.map.timeline.some(t => t.id === timeline.id)).toBe(true);
    expect(timeline.name).toBe('新时间线');
  });

  it('updateTimeline can edit fields', () => {
    const s = newStory({ name: '测试故事' });
    const timeline = s.appendTimeline({ name: '旧时间线' });

    const updated = s.updateTimeline(timeline.id, {
      name: '新时间线名字',
      speed: 2.0,
    });

    expect(updated.name).toBe('新时间线名字');
    expect(updated.speed).toBe(2.0);
  });

  it('removeTimeline deletes timeline and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const timeline = s.appendTimeline({ name: '待删除时间线' });

    s.removeTimeline(timeline.id);

    expect(s.map.timeline.some(t => t.id === timeline.id)).toBe(false);
    expect(s.map.worldTimeline.some(wt => wt.timelineId === timeline.id)).toBe(false);
    expect(s.map.historyTimeline.some(ht => ht.timelineId === timeline.id)).toBe(false);
  });
});

describe('ThisStory Item operations', () => {
  it('appendItem creates item', () => {
    const s = newStory({ name: '测试故事' });
    const item = s.appendItem({ name: '新物品', description: '物品描述' });

    expect(s.map.items.some(i => i.id === item.id)).toBe(true);
    expect(item.name).toBe('新物品');
  });

  it('updateItem can edit fields', () => {
    const s = newStory({ name: '测试故事' });
    const item = s.appendItem({ name: '旧物品', description: '旧描述' });

    const updated = s.updateItem(item.id, {
      name: '新物品名字',
      description: '新描述',
      appeared: true,
    });

    expect(updated.name).toBe('新物品名字');
    expect(updated.description).toBe('新描述');
    expect(updated.appeared).toBe(true);
  });

  it('removeItem deletes item and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const item = s.appendItem({ name: '待删除物品', description: '临时物品' });

    s.map.itemWho.push(createItemWho({
      itemId: item.id,
      whoId: 'w1',
      role: ItemWhoRole.OWNER,
    }));

    s.removeItem(item.id);

    expect(s.map.items.some(i => i.id === item.id)).toBe(false);
    expect(s.map.itemWho.some(iw => iw.itemId === item.id)).toBe(false);
    expect(s.map.itemPlace.some(ip => ip.itemId === item.id)).toBe(false);
    expect(s.map.itemOrganize.some(io => io.itemId === item.id)).toBe(false);
    expect(s.map.itemWorld.some(iw => iw.itemId === item.id)).toBe(false);
  });
});

describe('ThisStory Calendar operations', () => {
  it('appendCalendar creates calendar', () => {
    const s = newStory({ name: '测试故事' });
    const calendar = s.appendCalendar({ name: '新历法', description: '自定义历法' });

    expect(s.map.calendars.some(c => c.id === calendar.id)).toBe(true);
    expect(calendar.name).toBe('新历法');
    expect(calendar.description).toBe('自定义历法');
  });

  it('updateCalendar can edit fields', () => {
    const s = newStory({ name: '测试故事' });
    const calendar = s.appendCalendar({ name: '旧历法', description: '旧描述' });

    const updated = s.updateCalendar(calendar.id, {
      name: '新历法名字',
      description: '新描述',
    });

    expect(updated.name).toBe('新历法名字');
    expect(updated.description).toBe('新描述');
  });

  it('removeCalendar deletes calendar', () => {
    const s = newStory({ name: '测试故事' });
    const calendar = s.appendCalendar({ name: '待删除历法', description: '临时历法' });

    s.removeCalendar(calendar.id);

    expect(s.map.calendars.some(c => c.id === calendar.id)).toBe(false);
  });
});

describe('ThisStory Organize operations', () => {
  it('appendOrganize creates organize', () => {
    const s = newStory({ name: '测试故事' });
    const organize = s.appendOrganize({ name: '新组织', description: '组织描述' });

    expect(s.map.organizes.some(o => o.id === organize.id)).toBe(true);
    expect(organize.name).toBe('新组织');
  });

  it('updateOrganize can edit fields', () => {
    const s = newStory({ name: '测试故事' });
    const organize = s.appendOrganize({ name: '旧组织', description: '旧描述' });

    const updated = s.updateOrganize(organize.id, {
      name: '新组织名字',
      description: '新描述',
      appeared: true,
    });

    expect(updated.name).toBe('新组织名字');
    expect(updated.description).toBe('新描述');
    expect(updated.appeared).toBe(true);
  });

  it('removeOrganize deletes organize and related relations', () => {
    const s = newStory({ name: '测试故事' });
    const organize = s.appendOrganize({ name: '待删除组织', description: '临时组织' });

    s.map.organizeWho.push(createOrganizeWho({
      organizeId: organize.id,
      whoId: 'w1',
      role: OrganizeWhoRole.MEMBER,
    }));

    s.removeOrganize(organize.id);

    expect(s.map.organizes.some(o => o.id === organize.id)).toBe(false);
    expect(s.map.organizeWho.some(ow => ow.organizeId === organize.id)).toBe(false);
    expect(s.map.organizePlace.some(op => op.organizeId === organize.id)).toBe(false);
    expect(s.map.historyOrganize.some(ho => ho.organizeId === organize.id)).toBe(false);
  });
});

describe('ThisStory PlaceHistory operations', () => {
  it('appendSimplePlaceHistory creates history and links to place', () => {
    const s = newStory({ name: '测试故事' });
    const place = s.appendPlace({ name: '地点1' });
    const date = createStoryDate({
      rangeStart: 10,
      rangeEnd: 20,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimplePlaceHistory({ name: '地点事件', date, place });

    expect(s.map.Histories).toContain(hist);
    expect(hist.startAt?.rangeStart).toBe(10);
    expect(hist.endAt?.rangeEnd).toBe(20);

    expect(s.map.historyPlace.some(hp => hp.historyId === hist.id)).toBe(true);
    const relation = s.map.historyPlace.find(hp => hp.historyId === hist.id);
    expect(relation?.placeId).toBe(place.id);
  });

  it('appendSimplePlaceHistory can use default first place', () => {
    const s = newStory({ name: '测试故事' });
    const p = s.appendPlace({ name: '默认地点' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimplePlaceHistory({ name: '默认地点事件', date, place: p });

    expect(s.map.historyPlace.some(hp => hp.historyId === hist.id)).toBe(true);
    const relation = s.map.historyPlace.find(hp => hp.historyId === hist.id);
    expect(relation?.placeId).toBe(s.map.places[0].id);
  });
});

describe('ThisStory OrganizeHistory operations', () => {
  it('appendSimpleOrganizeHistory creates history and links to organize', () => {
    const s = newStory({ name: '测试故事' });
    const organize = s.appendOrganize({ name: '组织1', description: '测试组织' });
    const date = createStoryDate({
      rangeStart: 10,
      rangeEnd: 20,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleOrganizeHistory({
      name: '组织事件',
      date,
      organize: [{ organize, role: HistoryOrganizeRole.ORGANIZER }],
    });

    expect(s.map.Histories).toContain(hist);
    expect(hist.startAt?.rangeStart).toBe(10);
    expect(hist.endAt?.rangeEnd).toBe(20);

    expect(s.map.historyOrganize.some(ho => ho.historyId === hist.id)).toBe(true);
    const relation = s.map.historyOrganize.find(ho => ho.historyId === hist.id);
    expect(relation?.organizeId).toBe(organize.id);
    expect(relation?.role).toBe(HistoryOrganizeRole.ORGANIZER);
  });

  it('appendSimpleOrganizeHistory can use default first organize', () => {
    const s = newStory({ name: '测试故事' });
    const o = s.appendOrganize({ name: '默认组织', description: '测试组织' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleOrganizeHistory({ name: '默认组织事件', date, organize: o });

    expect(s.map.historyOrganize.some(ho => ho.historyId === hist.id)).toBe(true);
    const relation = s.map.historyOrganize.find(ho => ho.historyId === hist.id);
    expect(relation?.organizeId).toBe(s.map.organizes[0].id);
    expect(relation?.role).toBe(HistoryOrganizeRole.PARTICIPANT);
  });
});

describe('ThisStory WhoHistory operations', () => {
  it('appendSimpleWhoHistory creates history and links to who', () => {
    const s = newStory({ name: '测试故事' });
    const who = s.appendWho({ name: '人物1', description: '测试人物' });
    const date = createStoryDate({
      rangeStart: 10,
      rangeEnd: 20,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleWhoHistory({
      name: '人物事件',
      date,
      who,
    });

    expect(s.map.Histories).toContain(hist);
    expect(hist.startAt?.rangeStart).toBe(10);
    expect(hist.endAt?.rangeEnd).toBe(20);

    expect(s.map.historyWho.some(hw => hw.historyId === hist.id)).toBe(true);
    const relation = s.map.historyWho.find(hw => hw.historyId === hist.id);
    expect(relation?.whoId).toBe(who.id);
    expect(relation?.role).toBe(HistoryWhoRole.PARTICIPANT);
  });

  it('appendSimpleWhoHistory can use default first who', () => {
    const s = newStory({ name: '测试故事' });
    const w = s.appendWho({ name: '默认人物', description: '测试人物' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleWhoHistory({ name: '默认人物事件', date, who: w });

    expect(s.map.historyWho.some(hw => hw.historyId === hist.id)).toBe(true);
    const relation = s.map.historyWho.find(hw => hw.historyId === hist.id);
    expect(relation?.whoId).toBe(s.map.who[0].id);
    expect(relation?.role).toBe(HistoryWhoRole.PARTICIPANT);
  });
});

describe('ThisStory appendSimpleHistory (unified method)', () => {
  it('can attach to world only', () => {
    const s = newStory({ name: '测试故事' });
    const world = s.map.world[0];
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleHistory({
      name: '世界事件',
      date,
      world,
    });

    expect(s.map.Histories).toContain(hist);
    expect(s.map.historyWorld.some(hw => hw.historyId === hist.id)).toBe(true);
    expect(s.map.historyTimeline.some(ht => ht.historyId === hist.id)).toBe(false);
    expect(s.map.historyPlace.some(hp => hp.historyId === hist.id)).toBe(false);
  });

  it('can attach to timeline only', () => {
    const s = newStory({ name: '测试故事' });
    const timeline = s.map.timeline[0];
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: timeline.id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleHistory({
      name: '时间线事件',
      date,
      timeline,
    });

    expect(s.map.Histories).toContain(hist);
    expect(s.map.historyTimeline.some(ht => ht.historyId === hist.id)).toBe(true);
    expect(s.map.historyWorld.some(hw => hw.historyId === hist.id)).toBe(false);
  });

  it('can attach to multiple who with different roles', () => {
    const s = newStory({ name: '测试故事' });
    const who1 = s.appendWho({ name: '参与者', description: '人物1' });
    const who2 = s.appendWho({ name: '见证人', description: '人物2' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleHistory({
      name: '多人物事件',
      date,
      who: [
        { who: who1, role: HistoryWhoRole.PARTICIPANT },
        { who: who2, role: HistoryWhoRole.WITNESS },
      ],
    });

    expect(s.map.Histories).toContain(hist);
    expect(s.map.historyWho.filter(hw => hw.historyId === hist.id)).toHaveLength(2);
    const relations = s.map.historyWho.filter(hw => hw.historyId === hist.id);
    expect(relations.some(r => r.whoId === who1.id && r.role === HistoryWhoRole.PARTICIPANT)).toBe(true);
    expect(relations.some(r => r.whoId === who2.id && r.role === HistoryWhoRole.WITNESS)).toBe(true);
  });

  it('can attach to place and multiple organize', () => {
    const s = newStory({ name: '测试故事' });
    const place = s.appendPlace({ name: '事件地点' });
    const org1 = s.appendOrganize({ name: '组织1', description: '描述' });
    const org2 = s.appendOrganize({ name: '组织2', description: '描述' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: s.map.timeline[0].id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleHistory({
      name: '综合事件',
      date,
      place,
      organize: [
        { organize: org1, role: HistoryOrganizeRole.ORGANIZER },
        { organize: org2, role: HistoryOrganizeRole.PARTICIPANT },
      ],
    });

    expect(s.map.Histories).toContain(hist);
    expect(s.map.historyPlace.some(hp => hp.historyId === hist.id && hp.placeId === place.id)).toBe(true);
    expect(s.map.historyOrganize.filter(ho => ho.historyId === hist.id)).toHaveLength(2);
    const relations = s.map.historyOrganize.filter(ho => ho.historyId === hist.id);
    expect(relations.some(r => r.organizeId === org1.id && r.role === HistoryOrganizeRole.ORGANIZER)).toBe(true);
    expect(relations.some(r => r.organizeId === org2.id && r.role === HistoryOrganizeRole.PARTICIPANT)).toBe(true);
  });

  it('can attach to all entity types simultaneously', () => {
    const s = newStory({ name: '测试故事' });
    const world = s.map.world[0];
    const timeline = s.map.timeline[0];
    const place = s.appendPlace({ name: '地点' });
    const who = s.appendWho({ name: '人物', description: '描述' });
    const organize = s.appendOrganize({ name: '组织', description: '描述' });
    const date = createStoryDate({
      rangeStart: 0,
      rangeEnd: 0,
      timelineId: timeline.id,
      calendarId: s.map.calendars[0].id,
    });
    const hist = s.appendSimpleHistory({
      name: '完整事件',
      date,
      world,
      timeline,
      place,
      who,
      organize,
    });

    expect(s.map.Histories).toContain(hist);
    expect(s.map.historyWorld.some(hw => hw.historyId === hist.id)).toBe(true);
    expect(s.map.historyTimeline.some(ht => ht.historyId === hist.id)).toBe(true);
    expect(s.map.historyPlace.some(hp => hp.historyId === hist.id)).toBe(true);
    expect(s.map.historyWho.some(hw => hw.historyId === hist.id)).toBe(true);
    expect(s.map.historyOrganize.some(ho => ho.historyId === hist.id)).toBe(true);
  });
});
