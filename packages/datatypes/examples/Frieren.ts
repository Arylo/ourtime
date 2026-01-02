import { newStory, OrganizeWhoRole } from "../src/index";

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

const bhdApprox = (year: number, endYear?: number) => hdCalendar.getApproxStoryDate(hdCalendar.year(0 - year), hdCalendar.year(0 - (endYear ?? year)))
const hdApprox = (year: number, endYear?: number) => hdCalendar.getApproxStoryDate(hdCalendar.year(year), hdCalendar.year(endYear ?? year))

story.listWorlds()[0].appendPlace({ name: '南方大陸' })
story.listWorlds()[0].appendPlace({ name: '中央大陸' })
story.listWorlds()[0].appendPlace({ name: '北方大陸' })

const Serie = story.appendWho({ name: '赛丽艾' });
const Flamme = story.appendWho({ name: '伏拉梅' });
const Frieren = story.appendWho({ name: '芙莉莲' });
story.appendWho({ name: '马哈特', alias: ['黄金乡马哈特'] });
story.appendWho({ name: '佛鲁爷爷' });
story.appendWho({ name: '盖安' });
const Himmel = story.appendWho({ name: '辛美尔', alias: ['勇者辛美尔'] });
story.appendWho({ name: '南之勇者' });
story.appendWho({ name: '修拉哈特', alias: ['全知的修拉哈特'] });
const Qual = story.appendWho({ name: '古瓦尔', alias: ['腐败贤者古瓦尔'] });
story.appendWho({ name: '格鲁克' });
const Stark = story.appendWho({ name: '休塔尔克' });
const Fern = story.appendWho({ name: '菲伦' });
story.appendWho({ name: '列维' });
story.appendWho({ name: '米奴丝' });
story.appendWho({ name: '赞因' });
story.appendWho({ name: '大猩猩战士' });
const Heiter = story.appendWho({ name: '海塔' });
const Eisen = story.appendWho({ name: '艾泽' });
const Aura = story.appendWho({ name: '阿乌拉', alias: ['断头台阿乌拉'] });
story.appendWho({ name: '索莉缇尔' });

const BraveTeam = story.appendOrganize({ name: '勇者小队' })

const FrierenTeam = story.appendOrganize({ name: '芙莉莲小队' })

const MagicAssociation = story.appendOrganize({ name: '大陆魔法协会' })

const mainTimeline = story.listWorlds()[0].listTimelines()[0]

// 添加历史事件
// 1000 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '赛丽艾收伏拉梅为徒',
  startAt: bhdApprox(1000),
  endAt: bhdApprox(1000),
});

mainTimeline.appendHistory({
  name: '芙莉莲所居住的村庄被魔族屠杀，伏拉梅收留芙莉莲作为自己的弟子',
  startAt: bhdApprox(1000),
  endAt: bhdApprox(1000),
});

mainTimeline.appendHistory({
  name: '伏拉梅将自己与芙莉莲曾经的居所封印，并在其中留下了自己的手记',
  startAt: bhdApprox(1000),
  endAt: bhdApprox(1000),
});

mainTimeline
  .appendHistory({
    name: '伏拉梅过世',
    startAt: bhdApprox(1000),
    endAt: bhdApprox(1000),
  })
  .affectWho(Flamme, {
    appeared: false,
    departed: true,
  })

// 570 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '芙莉莲败于黄金乡马哈特，右手被黄金化，花了近100年才将其解除',
  startAt: bhdApprox(570),
  endAt: bhdApprox(570),
});

// 370 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '佛鲁爷爷开始守护自己的村子',
  startAt: bhdApprox(370),
  endAt: bhdApprox(370),
});

// 170 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '盖安开始在托尔大溪谷上建设桥梁',
  startAt: bhdApprox(170),
  endAt: bhdApprox(170),
});

// 76 B.H.D.的事件
mainTimeline.appendHistory({
  name: '勇者辛美尔出生',
  startAt: bhdApprox(76),
  endAt: bhdApprox(76),
})
  .affectWho(Himmel, {
    appeared: true,
  });

// 60 B.H.D.之前的事件
mainTimeline.appendHistory({
  name: '南之勇者邀请芙莉莲，遭拒',
  startAt: bhdApprox(60),
  endAt: bhdApprox(60),
});

// 60 B.H.D.的事件
mainTimeline
  .appendHistory({
    name: '勇者小队出发旅程',
    startAt: bhdApprox(60),
    endAt: bhdApprox(60),
  })
  .affectOrganize(BraveTeam, {
    startAt: bhdApprox(60),
    appeared: true,
  })
BraveTeam
  .inviteWho(Himmel, { role: OrganizeWhoRole.LEADER, startAt: bhdApprox(60) })
  .inviteWho(Frieren, { role: OrganizeWhoRole.MEMBER, startAt: bhdApprox(60) })
  .inviteWho(Heiter, { role: OrganizeWhoRole.MEMBER, startAt: bhdApprox(60) })
  .inviteWho(Eisen, { role: OrganizeWhoRole.MEMBER, startAt: bhdApprox(60) });

// 60 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '南之勇者对战七崩贤与全知的修拉哈特，讨伐其中3人，自己与全知的修拉哈特同归于尽',
  startAt: bhdApprox(60),
  endAt: bhdApprox(60),
});

// 60 B.H.D.之后的事件
mainTimeline.appendHistory({
  name: '勇者小队对战腐败贤者古瓦尔，将其封印',
  startAt: bhdApprox(60),
  endAt: bhdApprox(60),
});

// 53 B.H.D.的事件
mainTimeline.appendHistory({
  name: '八十年后的芙莉莲依靠女神之碑回到了过去',
  startAt: bhdApprox(53),
  endAt: bhdApprox(53),
});

// 50 B.H.D.之前的事件
mainTimeline.appendHistory({
  name: '黄金乡马哈特效命于维伊泽的领主格鲁克',
  startAt: bhdApprox(50),
  endAt: bhdApprox(50),
});

// 50 B.H.D.的事件
mainTimeline
  .appendHistory({
    name: '勇者小队成功讨伐魔王，回到王都',
    startAt: bhdApprox(50),
    endAt: bhdApprox(50),
  })
  .affectOrganize(BraveTeam, {
    endAt: bhdApprox(50),
    appeared: false,
    departed: true,
  })

// 20 B.H.D.前后的事件
mainTimeline
  .appendHistory({
    name: '赛丽艾建立大陆魔法协会',
    startAt: bhdApprox(20),
    endAt: bhdApprox(20),
  })
  .affectOrganize(MagicAssociation, {
    startAt: bhdApprox(20),
    appeared: true,
  });
MagicAssociation
  .inviteWho(Serie, { role: OrganizeWhoRole.LEADER, startAt: bhdApprox(20) });

mainTimeline.appendHistory({
  name: '黄金乡马哈特将维伊泽黄金化，之后被赛丽艾封印在维伊泽内',
  startAt: bhdApprox(20),
  endAt: bhdApprox(20),
});

// 10 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '飞行魔法成功为人类所解析利用',
  startAt: bhdApprox(10),
  endAt: bhdApprox(10),
});

// 1 B.H.D.的事件
mainTimeline.appendHistory({
  name: '勇者小队重聚',
  startAt: bhdApprox(1),
  endAt: bhdApprox(1),
});

// H.D. 1的事件
mainTimeline
  .appendHistory({
    name: '勇者辛美尔过世',
    startAt: hdApprox(1),
    endAt: hdApprox(1),
  })
  .affectWho(Himmel, {
    appeared: false,
    departed: true,
  })

// H.D. 11的事件
mainTimeline
  .appendHistory({
    name: '休塔尔克、菲伦出生',
    startAt: hdApprox(11),
    endAt: hdApprox(11),
  })
  .affectWho(Stark, {
    appeared: true,
  })
  .affectWho(Fern, {
    appeared: true,
  })

mainTimeline.appendHistory({
  name: '三大魔法使之一、被称为"叛逆的魔女"的精灵米奴丝在南方大陆引发了惨烈的战乱，疑似被当时是无名小卒的列维所杀，其圣杖之证也被列维获得',
  startAt: hdApprox(11),
  endAt: hdApprox(11),
});

// H.D. 19的事件
mainTimeline.appendHistory({
  name: '赞因的同伴「大猩猩战士」开始冒险',
  startAt: hdApprox(19),
  endAt: hdApprox(19),
});

// H.D. 20之前的事件
mainTimeline.appendHistory({
  name: '海塔收留菲伦',
  startAt: hdApprox(20),
  endAt: hdApprox(20),
});

// H.D. 20的事件
mainTimeline.appendHistory({
  name: '芙莉莲拜访海塔，收菲伦为徒',
  startAt: hdApprox(20),
  endAt: hdApprox(20),
});

// H.D. 20前后的事件
mainTimeline.appendHistory({
  name: '艾泽收休塔尔克为徒',
  startAt: hdApprox(20),
  endAt: hdApprox(20),
});

// H.D. 24~25的事件
mainTimeline
  .appendHistory({
    name: '海塔过世，芙莉莲与菲伦重新踏上旅途',
    startAt: hdApprox(24, 25),
    endAt: hdApprox(24, 25),
  })
  .affectWho(Heiter, {
    appeared: false,
    departed: true,
  })
  .affectOrganize(FrierenTeam, {
    startAt: hdApprox(25),
    appeared: true,
  })
FrierenTeam
  .inviteWho(Frieren, { role: OrganizeWhoRole.LEADER, startAt: hdApprox(25) })
  .inviteWho(Fern, { role: OrganizeWhoRole.MEMBER, startAt: hdApprox(25) });

// H.D. 27的事件
mainTimeline
  .appendHistory({
    name: '芙莉莲与菲伦解除腐败贤者古瓦尔的封印，并将其讨伐',
    startAt: hdApprox(27),
    endAt: hdApprox(27),
  })
  .affectWho(Qual, {
    departed: true,
  })

// H.D. 28的事件
mainTimeline.appendHistory({
  name: '艾泽邀请芙莉莲重返伏拉梅故居，芙莉莲得知「天国」可能在曾经的魔王城，将其设定为旅途目标',
  startAt: hdApprox(28),
  endAt: hdApprox(28),
});

mainTimeline
  .appendHistory({
    name: '休塔尔克加入芙莉莲小队',
    startAt: hdApprox(28),
    endAt: hdApprox(28),
  })
FrierenTeam
  .inviteWho(Stark, { role: OrganizeWhoRole.MEMBER, startAt: hdApprox(28) });

mainTimeline
  .appendHistory({
    name: '芙莉莲等人成功讨伐断头台阿乌拉与其手下的斩首官',
    startAt: hdApprox(28),
    endAt: hdApprox(28),
  })
  .affectWho(Aura, {
    appeared: false,
    departed: true,
  })

// H.D. 29的事件
mainTimeline
  .appendHistory({
    name: '赞因加入芙莉莲小队',
    startAt: hdApprox(29),
    endAt: hdApprox(29),
  });
FrierenTeam
  .inviteWho(Serie, { role: OrganizeWhoRole.MEMBER, startAt: hdApprox(29) });

mainTimeline.appendHistory({
  name: '赞因离开芙莉莲小队',
  startAt: hdApprox(29),
  endAt: hdApprox(29),
});
FrierenTeam
  .removeWho(Serie, { endAt: hdApprox(29) });

mainTimeline.appendHistory({
  name: '菲伦通过一级魔法使测验',
  startAt: hdApprox(29),
  endAt: hdApprox(29),
});

mainTimeline.appendHistory({
  name: '芙莉莲等人成功讨伐黄金乡马哈特与索莉缇尔，解除了覆盖维伊泽的黄金化',
  startAt: hdApprox(30),
  endAt: hdApprox(30),
});

// H.D. 31的事件
mainTimeline.appendHistory({
  name: '芙莉莲依靠女神之碑回到了八十年前，后来在当时的勇者小队的帮助下返回未来',
  startAt: hdApprox(31),
  endAt: hdApprox(31),
});

mainTimeline.appendHistory({
  name: '帝国举办国庆节，赛丽艾方面得到情报称影之战士打算暗杀赛丽艾',
  startAt: hdApprox(31),
  endAt: hdApprox(31),
});

mainTimeline.appendHistory({
  name: '赞因回归芙莉莲小队',
  startAt: hdApprox(31),
  endAt: hdApprox(31),
});
FrierenTeam
  .inviteWho(Serie, { startAt: hdApprox(31) });
