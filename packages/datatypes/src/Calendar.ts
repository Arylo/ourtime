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

/**
 * Calendar - 历法类型
 * 定义一个历法的月份信息
 */
export interface Calendar {
  id: string;
  name: string;
  description?: string;
  months?: MonthDefinition[];
}

/**
 * 创建一个新的 Calendar 对象
 */
export function createCalendar(data: {
  name: string;
  description?: string;
  months?: MonthDefinition[];
}): Calendar {
  // 验证：如果提供了months，则至少要有一个月
  if (data.months !== undefined && data.months.length === 0) {
    throw new Error('Invalid Calendar: if months is provided, it must have at least one month');
  }

  // 验证：每个月的天数必须大于 0
  if (data.months) {
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
  }

  return {
    id: ulid(),
    name: data.name,
    description: data.description,
    months: data.months?.map(m => ({
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
  if (!data.id || typeof data.id !== 'string') {
    throw new Error('Invalid Calendar: id is required and must be a string');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid Calendar: name is required and must be a string');
  }
  if (data.months !== undefined && (!Array.isArray(data.months) || data.months.length === 0)) {
    throw new Error('Invalid Calendar: if months is provided, it must be a non-empty array');
  }

  // 验证每个月份
  if (data.months) {
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
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    months: data.months?.map((m: any) => ({
      name: m.name,
      alias: m.alias,
      days: m.days,
    })),
  };
}

/**
 * 获取历法中一年的总天数
 */
export function getTotalDaysInYear(calendar: Calendar): number {
  if (!calendar.months) return 0;
  return calendar.months.reduce((total, month) => total + month.days, 0);
}

/**
 * 获取历法中的月份数量
 */
export function getMonthsPerYear(calendar: Calendar): number {
  return calendar.months?.length ?? 0;
}

/**
 * 根据月份索引获取月份信息（索引从0开始）
 */
export function getMonthByIndex(calendar: Calendar, index: number): MonthDefinition | undefined {
  if (!calendar.months || index < 0 || index >= calendar.months.length) {
    return undefined;
  }
  return calendar.months[index];
}

/**
 * 根据月份名称或别名查找月份索引（返回第一个匹配的）
 */
export function findMonthIndex(calendar: Calendar, nameOrAlias: string): number {
  if (!calendar.months) return -1;
  return calendar.months.findIndex(month =>
    month.name === nameOrAlias ||
    (month.alias && month.alias.includes(nameOrAlias))
  );
}
