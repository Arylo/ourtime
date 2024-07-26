export type Values<T extends Record<string, any>> = T[keyof T]

export type OrEnum<T, DT = any> = T extends Record<string, DT> ? T[keyof T] extends DT ? T : DT : DT
