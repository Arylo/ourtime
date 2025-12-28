import { ulid } from 'ulid';

/**
 * MonthDefinition - 月份定义
 * 包含月份的名称、别名和天数
 */
export interface MonthDefinition {
  name: string;
  alias?: string[];
  days: number;
}

interface BaseCalendar {
  name: string;
  alias?: string[];
  description?: string;
  months: MonthDefinition[];
}

/**
 * Calendar - 历法类型
 * 定义一个历法的月份信息
 */
export interface Calendar extends BaseCalendar {
  id: string;
}

/**
 * 验证日历数据的有效性
 */
export function validateCalendar<D extends Pick<Calendar, 'months'>>(data: D): data is D {
  // 验证：months 必须是非空数组
  if (!Array.isArray(data.months) || data.months.length === 0) {
    throw new Error('Invalid Calendar: months is required and must be a non-empty array');
  }

  // 验证：每个月的天数必须大于 0
  for (let i = 0; i < data.months.length; i++) {
    const month = data.months[i];
    if (!month.name || typeof month.name !== 'string') {
      throw new Error(`Invalid Calendar: month at index ${i} must have a name`);
    }
    if (typeof month.days !== 'number' || month.days <= 0) {
      throw new Error(`Invalid Calendar: month "${month.name}" must have positive days`);
    }
    if (month.alias !== undefined && !Array.isArray(month.alias)) {
      throw new Error(`Invalid Calendar: month "${month.name}" alias must be an array`);
    }
  }

  return true
}

/**
 * 验证从对象创建的日历数据
 */
export function validateCalendarFromObject(data: Record<string, any>): data is BaseCalendar {
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Calendar: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Calendar: name is required and must be a string');
  }

  // 使用通用的日历验证逻辑
  validateCalendar({
    name: data.name,
    description: data.description,
    months: data.months,
  });

  return true
}

/**
 * 创建一个新的 Calendar 对象
 */
export function createCalendar(data: {
  name: string;
  alias?: string[];
  description?: string;
  months: MonthDefinition[];
}): Calendar {
  // 验证日历数据
  validateCalendar(data);

  return {
    id: ulid(),
    name: data.name,
    alias: data.alias,
    description: data.description,
    months: data.months.map(m => ({
      name: m.name,
      alias: m.alias,
      days: m.days,
    })),
  };
}

/**
 * 从对象创建 Calendar 数据
 */
export function fromCalendar(data: Record<string, any>): Calendar {
  // 验证日历数据
  validateCalendarFromObject(data);

  return {
    id: data.id,
    name: data.name,
    alias: data.alias,
    description: data.description,
    months: data.months.map((m: any) => ({
      name: m.name,
      alias: m.alias,
      days: m.days,
    })),
  };
}
