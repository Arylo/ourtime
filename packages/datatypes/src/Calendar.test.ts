import { describe, it, expect } from 'vitest';
import {
  createCalendar,
  fromCalendar,
  getTotalDaysInYear,
  getMonthsPerYear,
  getMonthByIndex,
  findMonthIndex,
} from './Calendar';

describe('Calendar', () => {
  describe('createCalendar', () => {
    it('应该创建一个中国农历样式的历法', () => {
      const calendar = createCalendar({
        name: 'Chinese Lunar Calendar',
        description: '中国农历',
        months: [
          { name: '正月', alias: ['端月'], days: 30 },
          { name: '二月', days: 28 },
          { name: '三月', days: 31 },
          { name: '四月', days: 30 },
          { name: '五月', days: 31 },
          { name: '六月', days: 30 },
          { name: '七月', days: 31 },
          { name: '八月', days: 31 },
          { name: '九月', days: 30 },
          { name: '十月', days: 31 },
          { name: '冬月', alias: ['十一月'], days: 30 },
          { name: '腊月', alias: ['十二月'], days: 31 },
        ],
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Chinese Lunar Calendar');
      expect(calendar.description).toBe('中国农历');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(12);
      expect(calendar.months![0].name).toBe('正月');
      expect(calendar.months![0].alias).toEqual(['端月']);
      expect(calendar.months![0].days).toBe(30);
      expect(calendar.months![1].name).toBe('二月');
      expect(calendar.months![1].days).toBe(28);
    });

    it('应该创建一个标准的阳历历法', () => {
      const calendar = createCalendar({
        name: 'Gregorian Calendar',
        description: '公历',
        months: [
          { name: 'January', alias: ['Jan'], days: 31 },
          { name: 'February', alias: ['Feb'], days: 28 },
          { name: 'March', alias: ['Mar'], days: 31 },
          { name: 'April', alias: ['Apr'], days: 30 },
          { name: 'May', days: 31 },
          { name: 'June', alias: ['Jun'], days: 30 },
          { name: 'July', alias: ['Jul'], days: 31 },
          { name: 'August', alias: ['Aug'], days: 31 },
          { name: 'September', alias: ['Sep', 'Sept'], days: 30 },
          { name: 'October', alias: ['Oct'], days: 31 },
          { name: 'November', alias: ['Nov'], days: 30 },
          { name: 'December', alias: ['Dec'], days: 31 },
        ],
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Gregorian Calendar');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(12);
      expect(calendar.months![8].alias).toEqual(['Sep', 'Sept']);
    });

    it('应该创建一个自定义历法', () => {
      const calendar = createCalendar({
        name: 'Custom Calendar',
        months: [
          { name: 'First', days: 36 },
          { name: 'Second', days: 36 },
          { name: 'Third', days: 36 },
        ],
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Custom Calendar');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(3);
    });

    it('应该在提供空月份数组时抛出错误', () => {
      expect(() => {
        createCalendar({
          name: 'Invalid Calendar',
          months: [],
        });
      }).toThrow('Invalid Calendar: if months is provided, it must have at least one month');
    });

    it('应该允许不提供月份', () => {
      const calendar = createCalendar({
        name: 'Calendar Without Months',
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Calendar Without Months');
      expect(calendar.months).toBeUndefined();
    });

    it('应该在月份名称缺失时抛出错误', () => {
      expect(() => {
        createCalendar({
          name: 'Invalid Calendar',
          months: [{ name: '', days: 30 }],
        });
      }).toThrow('Invalid Calendar: month at index 0 must have a name');
    });

    it('应该在天数小于等于0时抛出错误', () => {
      expect(() => {
        createCalendar({
          name: 'Invalid Calendar',
          months: [
            { name: 'First', days: 31 },
            { name: 'Second', days: 0 },
          ],
        });
      }).toThrow('Invalid Calendar: month "Second" must have positive days');
    });

    it('应该在别名不是数组时抛出错误', () => {
      expect(() => {
        createCalendar({
          name: 'Invalid Calendar',
          months: [{ name: 'First', alias: 'invalid' as any, days: 30 }],
        });
      }).toThrow('Invalid Calendar: month "First" alias must be an array');
    });
  });

  describe('fromCalendar', () => {
    it('应该从对象创建 Calendar', () => {
      const data = {
        id: 'test-id',
        name: 'Test Calendar',
        description: 'Test description',
        months: [
          { name: '正月', alias: ['端月'], days: 30 },
          { name: '二月', days: 28 },
        ],
      };

      const calendar = fromCalendar(data);

      expect(calendar.id).toBe('test-id');
      expect(calendar.name).toBe('Test Calendar');
      expect(calendar.description).toBe('Test description');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(2);
      expect(calendar.months![0].name).toBe('正月');
      expect(calendar.months![0].alias).toEqual(['端月']);
      expect(calendar.months![0].days).toBe(30);
    });

    it('应该在缺少 id 时抛出错误', () => {
      expect(() => {
        fromCalendar({
          name: 'Test',
          months: [{ name: 'Month', days: 30 }],
        });
      }).toThrow('Invalid Calendar: id is required and must be a string');
    });

    it('应该在缺少 name 时抛出错误', () => {
      expect(() => {
        fromCalendar({
          id: 'test-id',
          months: [{ name: 'Month', days: 30 }],
        });
      }).toThrow('Invalid Calendar: name is required and must be a string');
    });

    it('应该在 months 为空数组时抛出错误', () => {
      expect(() => {
        fromCalendar({
          id: 'test-id',
          name: 'Test',
          months: [],
        });
      }).toThrow('Invalid Calendar: if months is provided, it must be a non-empty array');
    });

    it('应该允许不提供 months', () => {
      const calendar = fromCalendar({
        id: 'test-id',
        name: 'Test',
      });

      expect(calendar.id).toBe('test-id');
      expect(calendar.name).toBe('Test');
      expect(calendar.months).toBeUndefined();
    });
  });

  describe('getTotalDaysInYear', () => {
    it('应该计算一年的总天数', () => {
      const calendar = createCalendar({
        name: 'Test Calendar',
        months: [
          { name: 'January', days: 31 },
          { name: 'February', days: 28 },
          { name: 'March', days: 31 },
          { name: 'April', days: 30 },
          { name: 'May', days: 31 },
          { name: 'June', days: 30 },
          { name: 'July', days: 31 },
          { name: 'August', days: 31 },
          { name: 'September', days: 30 },
          { name: 'October', days: 31 },
          { name: 'November', days: 30 },
          { name: 'December', days: 31 },
        ],
      });

      expect(getTotalDaysInYear(calendar)).toBe(365);
    });
  });

  describe('getMonthsPerYear', () => {
    it('应该返回月份数量', () => {
      const calendar = createCalendar({
        name: 'Test Calendar',
        months: [
          { name: 'First', days: 30 },
          { name: 'Second', days: 30 },
          { name: 'Third', days: 30 },
        ],
      });

      expect(getMonthsPerYear(calendar)).toBe(3);
    });
  });

  describe('getMonthByIndex', () => {
    const calendar = createCalendar({
      name: 'Test Calendar',
      months: [
        { name: '正月', alias: ['端月'], days: 30 },
        { name: '二月', days: 28 },
        { name: '三月', days: 31 },
      ],
    });

    it('应该根据索引获取月份', () => {
      const month = getMonthByIndex(calendar, 0);
      expect(month).toBeDefined();
      expect(month?.name).toBe('正月');
      expect(month?.alias).toEqual(['端月']);
      expect(month?.days).toBe(30);
    });

    it('应该在索引超出范围时返回 undefined', () => {
      expect(getMonthByIndex(calendar, -1)).toBeUndefined();
      expect(getMonthByIndex(calendar, 10)).toBeUndefined();
    });
  });

  describe('findMonthIndex', () => {
    const calendar = createCalendar({
      name: 'Test Calendar',
      months: [
        { name: '正月', alias: ['端月'], days: 30 },
        { name: '二月', days: 28 },
        { name: '三月', days: 31 },
      ],
    });

    it('应该根据名称查找月份索引', () => {
      expect(findMonthIndex(calendar, '正月')).toBe(0);
      expect(findMonthIndex(calendar, '二月')).toBe(1);
      expect(findMonthIndex(calendar, '三月')).toBe(2);
    });

    it('应该根据别名查找月份索引', () => {
      expect(findMonthIndex(calendar, '端月')).toBe(0);
    });

    it('应该在找不到时返回 -1', () => {
      expect(findMonthIndex(calendar, '不存在的月份')).toBe(-1);
    });
  });

  describe('Calendar 使用场景', () => {
    it('应该支持不规则的月份天数', () => {
      const calendar = createCalendar({
        name: 'Irregular Calendar',
        months: [
          { name: 'Long Month', days: 90 },
          { name: 'Medium Month', days: 91 },
          { name: 'Short Month', days: 92 },
          { name: 'Another Month', days: 92 },
        ],
      });

      expect(getTotalDaysInYear(calendar)).toBe(365);
      expect(getMonthsPerYear(calendar)).toBe(4);
    });

    it('应该支持月份的多个别名', () => {
      const calendar = createCalendar({
        name: 'Multi-Alias Calendar',
        months: [
          { name: 'September', alias: ['Sep', 'Sept', '九月'], days: 30 },
        ],
      });

      expect(findMonthIndex(calendar, 'September')).toBe(0);
      expect(findMonthIndex(calendar, 'Sep')).toBe(0);
      expect(findMonthIndex(calendar, 'Sept')).toBe(0);
      expect(findMonthIndex(calendar, '九月')).toBe(0);
    });
  });
});
