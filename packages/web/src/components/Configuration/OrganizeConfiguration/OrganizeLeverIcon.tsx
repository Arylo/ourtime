import cc from 'classcat'

type LevelIconProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
}

export function Level1Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-1-outline': !props.active,
        'i-material-symbols-light-counter-1': props.active,
      }
    ])}
  />
}

export function Level2Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-2-outline': !props.active,
        'i-material-symbols-light-counter-2': props.active,
      }
    ])}
  />
}

export function Level3Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-3-outline': !props.active,
        'i-material-symbols-light-counter-3': props.active,
      }
    ])}
  />
}

export function Level4Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-4-outline': !props.active,
        'i-material-symbols-light-counter-4': props.active,
      }
    ])}
  />
}

export function Level5Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-5-outline': !props.active,
        'i-material-symbols-light-counter-5': props.active,
      }
    ])}
  />
}

export function Level6Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-6-outline': !props.active,
        'i-material-symbols-light-counter-6': props.active,
      }
    ])}
  />
}

export function Level7Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-7-outline': !props.active,
        'i-material-symbols-light-counter-7': props.active,
      }
    ])}
  />
}

export function Level8Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-8-outline': !props.active,
        'i-material-symbols-light-counter-8': props.active,
      }
    ])}
  />
}

export function Level9Icon (props: LevelIconProps) {
  return <div
    {...props}
    className={cc([
      props.className,
      {
        'i-material-symbols-light-counter-9-outline': !props.active,
        'i-material-symbols-light-counter-9': props.active,
      }
    ])}
  />
}
