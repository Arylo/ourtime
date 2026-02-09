const CONFIGURATION_TYPE = {
  STORY: 'story',
  CALENDAR: 'calendar',
  ORGANIZE: 'organize',
  WHO: 'who',
  ITEM: 'item',
  NONE: 'none',
} as const

type CONFIGURATION_TYPE = typeof CONFIGURATION_TYPE[keyof typeof CONFIGURATION_TYPE]

export default CONFIGURATION_TYPE
