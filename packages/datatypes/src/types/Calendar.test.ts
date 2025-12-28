import { describe, it, expect } from 'vitest';
import {
  createCalendar,
  fromCalendar,
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

    it('应该创建一个带有别名的历法', () => {
      const calendar = createCalendar({
        name: 'Calendar with Aliases',
        alias: ['别名历法', 'Alternative Calendar'],
        description: '这是一个带有别名的历法',
        months: [
          { name: 'First', days: 30 },
          { name: 'Second', days: 31 },
        ],
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Calendar with Aliases');
      expect(calendar.alias).toEqual(['别名历法', 'Alternative Calendar']);
      expect(calendar.description).toBe('这是一个带有别名的历法');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(2);
    });

    it('应该创建一个没有别名的历法', () => {
      const calendar = createCalendar({
        name: 'Calendar without Aliases',
        description: '这是一个没有别名的历法',
        months: [
          { name: 'First', days: 30 },
          { name: 'Second', days: 31 },
        ],
      });

      expect(calendar.id).toBeDefined();
      expect(calendar.name).toBe('Calendar without Aliases');
      expect(calendar.alias).toBeUndefined();
      expect(calendar.description).toBe('这是一个没有别名的历法');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(2);
    });

    it('应该在提供空月份数组时抛出错误', () => {
      expect(() => {
        createCalendar({
          name: 'Invalid Calendar',
          months: [],
        });
      }).toThrow('Invalid Calendar: months is required and must be a non-empty array');
    });

    it('不应该允许不提供月份', () => {
      expect(() => {
        createCalendar({
          name: 'Calendar Without Months',
        } as any);
      }).toThrow('Invalid Calendar: months is required and must be a non-empty array');
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

    it('应该从对象创建带有别名的 Calendar', () => {
      const data = {
        id: 'test-id-2',
        name: 'Calendar with Aliases',
        alias: ['别名历法', 'Alternative Calendar'],
        description: '这是一个带有别名的历法',
        months: [
          { name: 'First', days: 30 },
          { name: 'Second', days: 31 },
        ],
      };

      const calendar = fromCalendar(data);

      expect(calendar.id).toBe('test-id-2');
      expect(calendar.name).toBe('Calendar with Aliases');
      expect(calendar.alias).toEqual(['别名历法', 'Alternative Calendar']);
      expect(calendar.description).toBe('这是一个带有别名的历法');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(2);
    });

    it('应该从对象创建没有别名的 Calendar', () => {
      const data = {
        id: 'test-id-3',
        name: 'Calendar without Aliases',
        description: '这是一个没有别名的历法',
        months: [
          { name: 'First', days: 30 },
          { name: 'Second', days: 31 },
        ],
      };

      const calendar = fromCalendar(data);

      expect(calendar.id).toBe('test-id-3');
      expect(calendar.name).toBe('Calendar without Aliases');
      expect(calendar.alias).toBeUndefined();
      expect(calendar.description).toBe('这是一个没有别名的历法');
      expect(calendar.months).toBeDefined();
      expect(calendar.months!.length).toBe(2);
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
      }).toThrow('Invalid Calendar: months is required and must be a non-empty array');
    });

    it('不应该允许不提供 months', () => {
      expect(() => {
        fromCalendar({
          id: 'test-id',
          name: 'Test',
        });
      }).toThrow('Invalid Calendar: months is required and must be a non-empty array');
    });
  });
});
