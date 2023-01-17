const parseClassNames = <T extends string>(classNames: T | (T | undefined)[] = [], className?: T) => {
  return (Array.isArray(classNames) ? classNames : [classNames])
    .concat([className])
    .filter(Boolean)
    .join(' ')
}

export default parseClassNames
