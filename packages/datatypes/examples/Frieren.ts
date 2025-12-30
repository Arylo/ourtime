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
  'H.D. 25': hdCalendar.getApproxStoryDate(hdCalendar.year(25), hdCalendar.year(25)),
  'H.D. 27': hdCalendar.getApproxStoryDate(hdCalendar.year(27), hdCalendar.year(27)),
  'H.D. 28': hdCalendar.getApproxStoryDate(hdCalendar.year(28), hdCalendar.year(28)),
  'H.D. 29': hdCalendar.getApproxStoryDate(hdCalendar.year(29), hdCalendar.year(29)),
  'H.D. 30': hdCalendar.getApproxStoryDate(hdCalendar.year(30), hdCalendar.year(30)),
  'H.D. 31': hdCalendar.getApproxStoryDate(hdCalendar.year(31), hdCalendar.year(31)),
} as const;

story.appendWho({ name: '赛丽艾' });
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
  startAt: hdDateMap['1000 B.H.D.'],
  endAt: hdDateMap['1000 B.H.D.'],
});

mainTimeline.appendHistory({
  name: '芙莉莲所居住的村庄被魔族屠杀，伏拉梅收留芙莉莲作为自己的弟子',
  startAt: hdDateMap['1000 B.H.D.'],
  endAt: hdDateMap['1000 B.H.D.'],
});

mainTimeline.appendHistory({
  name: '伏拉梅将自己与芙莉莲曾经的居所封印，并在其中留下了自己的手记',
  startAt: hdDateMap['1000 B.H.D.'],
  endAt: hdDateMap['1000 B.H.D.'],
});

mainTimeline
  .appendHistory({
    name: '伏拉梅过世',
    startAt: hdDateMap['1000 B.H.D.'],
    endAt: hdDateMap['1000 B.H.D.'],
  })
  .affectWho(Flamme, {
    appeared: false,
    departed: true,
  })

// 570 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '芙莉莲败于黄金乡马哈特，右手被黄金化，花了近100年才将其解除',
  startAt: hdDateMap['570 B.H.D.'],
  endAt: hdDateMap['570 B.H.D.'],
});

// 370 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '佛鲁爷爷开始守护自己的村子',
  startAt: hdDateMap['370 B.H.D.'],
  endAt: hdDateMap['370 B.H.D.'],
});

// 170 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '盖安开始在托尔大溪谷上建设桥梁',
  startAt: hdDateMap['170 B.H.D.'],
  endAt: hdDateMap['170 B.H.D.'],
});

// 76 B.H.D.的事件
mainTimeline.appendHistory({
  name: '勇者辛美尔出生',
  startAt: hdDateMap['76 B.H.D.'],
  endAt: hdDateMap['76 B.H.D.'],
})
  .affectWho(Himmel, {
    appeared: true,
  });

// 60 B.H.D.之前的事件
mainTimeline.appendHistory({
  name: '南之勇者邀请芙莉莲，遭拒',
  startAt: hdDateMap['60 B.H.D.'],
  endAt: hdDateMap['60 B.H.D.'],
});

// 60 B.H.D.的事件
mainTimeline
  .appendHistory({
    name: '勇者小队出发旅程',
    startAt: hdDateMap['60 B.H.D.'],
    endAt: hdDateMap['60 B.H.D.'],
  })
  .affectOrganize(BraveTeam, {
    startAt: hdDateMap['60 B.H.D.'],
    appeared: true,
  })

// 60 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '南之勇者对战七崩贤与全知的修拉哈特，讨伐其中3人，自己与全知的修拉哈特同归于尽',
  startAt: hdDateMap['60 B.H.D.'],
  endAt: hdDateMap['60 B.H.D.'],
});

// 60 B.H.D.之后的事件
mainTimeline.appendHistory({
  name: '勇者小队对战腐败贤者古瓦尔，将其封印',
  startAt: hdDateMap['60 B.H.D.'],
  endAt: hdDateMap['60 B.H.D.'],
});

// 53 B.H.D.的事件
mainTimeline.appendHistory({
  name: '八十年后的芙莉莲依靠女神之碑回到了过去',
  startAt: hdDateMap['53 B.H.D.'],
  endAt: hdDateMap['53 B.H.D.'],
});

// 50 B.H.D.之前的事件
mainTimeline.appendHistory({
  name: '黄金乡马哈特效命于维伊泽的领主格鲁克',
  startAt: hdDateMap['50 B.H.D.'],
  endAt: hdDateMap['50 B.H.D.'],
});

// 50 B.H.D.的事件
mainTimeline
  .appendHistory({
    name: '勇者小队成功讨伐魔王，回到王都',
    startAt: hdDateMap['50 B.H.D.'],
    endAt: hdDateMap['50 B.H.D.'],
  })
  .affectOrganize(BraveTeam, {
    endAt: hdDateMap['50 B.H.D.'],
    appeared: false,
    departed: true,
  })

// 20 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '赛丽艾建立大陆魔法协会',
  startAt: hdDateMap['20 B.H.D.'],
  endAt: hdDateMap['20 B.H.D.'],
});

mainTimeline.appendHistory({
  name: '黄金乡马哈特将维伊泽黄金化，之后被赛丽艾封印在维伊泽内',
  startAt: hdDateMap['20 B.H.D.'],
  endAt: hdDateMap['20 B.H.D.'],
});

// 10 B.H.D.前后的事件
mainTimeline.appendHistory({
  name: '飞行魔法成功为人类所解析利用',
  startAt: hdDateMap['10 B.H.D.'],
  endAt: hdDateMap['10 B.H.D.'],
});

// 1 B.H.D.的事件
mainTimeline.appendHistory({
  name: '勇者小队重聚',
  startAt: hdDateMap['1 B.H.D.'],
  endAt: hdDateMap['1 B.H.D.'],
});

// H.D. 1的事件
mainTimeline
  .appendHistory({
    name: '勇者辛美尔过世',
    startAt: hdDateMap['H.D. 1'],
    endAt: hdDateMap['H.D. 1'],
  })
  .affectWho(Himmel, {
    appeared: false,
    departed: true,
  })

// H.D. 11的事件
mainTimeline
  .appendHistory({
    name: '休塔尔克、菲伦出生',
    startAt: hdDateMap['H.D. 11'],
    endAt: hdDateMap['H.D. 11'],
  })
  .affectWho(Stark, {
    appeared: true,
  })
  .affectWho(Fern, {
    appeared: true,
  })

mainTimeline.appendHistory({
  name: '三大魔法使之一、被称为"叛逆的魔女"的精灵米奴丝在南方大陆引发了惨烈的战乱，疑似被当时是无名小卒的列维所杀，其圣杖之证也被列维获得',
  startAt: hdDateMap['H.D. 11'],
  endAt: hdDateMap['H.D. 11'],
});

// H.D. 19的事件
mainTimeline.appendHistory({
  name: '赞因的同伴「大猩猩战士」开始冒险',
  startAt: hdDateMap['H.D. 19'],
  endAt: hdDateMap['H.D. 19'],
});

// H.D. 20之前的事件
mainTimeline.appendHistory({
  name: '海塔收留菲伦',
  startAt: hdDateMap['H.D. 20'],
  endAt: hdDateMap['H.D. 20'],
});

// H.D. 20的事件
mainTimeline.appendHistory({
  name: '芙莉莲拜访海塔，收菲伦为徒',
  startAt: hdDateMap['H.D. 20'],
  endAt: hdDateMap['H.D. 20'],
});

// H.D. 20前后的事件
mainTimeline.appendHistory({
  name: '艾泽收休塔尔克为徒',
  startAt: hdDateMap['H.D. 20'],
  endAt: hdDateMap['H.D. 20'],
});

// H.D. 24~25的事件
mainTimeline
  .appendHistory({
    name: '海塔过世，芙莉莲与菲伦重新踏上旅途',
    startAt: hdDateMap['H.D. 24~25'],
    endAt: hdDateMap['H.D. 24~25'],
  })
  .affectWho(Heiter, {
    appeared: false,
    departed: true,
  })
  .affectOrganize(FrierenTeam, {
    startAt: hdDateMap['H.D. 25'],
    appeared: true,
  })


// H.D. 27的事件
mainTimeline
  .appendHistory({
    name: '芙莉莲与菲伦解除腐败贤者古瓦尔的封印，并将其讨伐',
    startAt: hdDateMap['H.D. 27'],
    endAt: hdDateMap['H.D. 27'],
  })
  .affectWho(Qual, {
    departed: true,
  })

// H.D. 28的事件
mainTimeline.appendHistory({
  name: '艾泽邀请芙莉莲重返伏拉梅故居，芙莉莲得知「天国」可能在曾经的魔王城，将其设定为旅途目标',
  startAt: hdDateMap['H.D. 28'],
  endAt: hdDateMap['H.D. 28'],
});

mainTimeline
  .appendHistory({
    name: '休塔尔克加入芙莉莲小队',
    startAt: hdDateMap['H.D. 28'],
    endAt: hdDateMap['H.D. 28'],
  })

mainTimeline
  .appendHistory({
    name: '芙莉莲等人成功讨伐断头台阿乌拉与其手下的斩首官',
    startAt: hdDateMap['H.D. 28'],
    endAt: hdDateMap['H.D. 28'],
  })
  .affectWho(Aura, {
    appeared: false,
    departed: true,
  })

// H.D. 29的事件
mainTimeline.appendHistory({
  name: '赞因加入芙莉莲小队',
  startAt: hdDateMap['H.D. 29'],
  endAt: hdDateMap['H.D. 29'],
});

mainTimeline.appendHistory({
  name: '赞因离开芙莉莲小队',
  startAt: hdDateMap['H.D. 29'],
  endAt: hdDateMap['H.D. 29'],
});

mainTimeline.appendHistory({
  name: '菲伦通过一级魔法使测验',
  startAt: hdDateMap['H.D. 29'],
  endAt: hdDateMap['H.D. 29'],
});

mainTimeline.appendHistory({
  name: '芙莉莲等人成功讨伐黄金乡马哈特与索莉缇尔，解除了覆盖维伊泽的黄金化',
  startAt: hdDateMap['H.D. 30'],
  endAt: hdDateMap['H.D. 30'],
});

// H.D. 31的事件
mainTimeline.appendHistory({
  name: '芙莉莲依靠女神之碑回到了八十年前，后来在当时的勇者小队的帮助下返回未来',
  startAt: hdDateMap['H.D. 31'],
  endAt: hdDateMap['H.D. 31'],
});

mainTimeline.appendHistory({
  name: '帝国举办国庆节，赛丽艾方面得到情报称影之战士打算暗杀赛丽艾',
  startAt: hdDateMap['H.D. 31'],
  endAt: hdDateMap['H.D. 31'],
});

mainTimeline.appendHistory({
  name: '赞因回归芙莉莲小队',
  startAt: hdDateMap['H.D. 31'],
  endAt: hdDateMap['H.D. 31'],
});
